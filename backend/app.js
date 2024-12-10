const express = require("express");
const dotenv = require("dotenv");
const { spawn } = require("child_process");
const axios = require("axios");
const connectDB = require("./config/db");

// Import routes
const sellerRoutes = require('./routes/sellerRoutes');
const buyerRoutes = require('./routes/buyerRoutes');
const adminRoutes = require('./routes/adminRoutes');
const bookRoutes = require('./routes/bookRoutes');
const rentalRoutes = require('./routes/rentalRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// Start the Flask app as a subprocess
const flaskProcess = spawn("python", ["./ml/app.py"]);

flaskProcess.stdout.on("data", (data) => {
  console.log(`Flask stdout: ${data}`);
});

flaskProcess.stderr.on("data", (data) => {
  console.error(`Flask stderr: ${data}`);
});

flaskProcess.on("close", (code) => {
  console.log(`Flask process exited with code ${code}`);
});

// Proxy route to Flask for ML predictions
app.post("/api/predict-price", async (req, res) => {
  try {
    const flaskResponse = await axios.post("http://localhost:5001/predict-price", req.body);
    res.json(flaskResponse.data);
  } catch (error) {
    console.error("Error communicating with Flask:", error.message);
    res.status(500).json({ error: "Flask service error" });
  }
});

// Use other routes
app.use('/api/seller', sellerRoutes);
app.use('/api/buyer', buyerRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/rentals', rentalRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start Node.js server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

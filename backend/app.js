const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
// Import routes
const sellerRoutes = require('./routes/sellerRoutes');
const buyerRoutes = require('./routes/buyerRoutes'); // Corrected to buyerRoutes
const adminRoutes = require('./routes/adminRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// Use routes
app.use('/api/seller', sellerRoutes); // Updated to match seller routes
app.use('/api/buyer', buyerRoutes);   // Updated to match buyer routes
app.use('/api/admin', adminRoutes);   // Correct admin routes

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Import routes
const sellerRoutes = require('./routes/sellerRoutes'); // Seller routes
const buyerRoutes = require('./routes/buyerRoutes');   // Buyer routes
const adminRoutes = require('./routes/adminRoutes');   // Admin routes
const bookRoutes = require('./routes/bookRoutes');     // Book routes
const rentalRoutes = require('./routes/rentalRoutes'); // Rental routes

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// Use routes
app.use('/api/seller', sellerRoutes); // seller routes
app.use('/api/buyer', buyerRoutes); // buyer routes
app.use('/api/admin', adminRoutes); // admin routes
app.use('/api/books', bookRoutes); //Book routes
app.use('/api/rentals', rentalRoutes); //Rental routes

// Root route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    shopName: { type: String }, // Seller-specific field
    shopAddress: { type: String }, // Optional
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt
});

module.exports = mongoose.model('Seller', sellerSchema);

const Admin = require('../models/Admin');
const Buyer = require('../models/Buyer');
const Seller = require('../models/Seller');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Admin login
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find admin by email
        const admin = await Admin.findOne({ email });
        if (!admin) return res.status(404).json({ message: 'Admin not found' });

        // Validate password
        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) return res.status(401).json({ message: 'Invalid credentials' });

        // Generate JWT token
        const token = jwt.sign({ id: admin._id, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.status(200).json({ token, message: 'Admin login successful' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};


// Fetch admin profile
const getAdminProfile = async (req, res) => {
    try {
        const admin = await Admin.findById(req.user.id).select('-password');
        if (!admin) return res.status(404).json({ message: 'Admin not found' });

        res.json(admin);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Change admin password
const updateAdminPassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;

        const admin = await Admin.findById(req.user.id);
        if (!admin) return res.status(404).json({ message: 'Admin not found' });

        const isPasswordValid = await bcrypt.compare(currentPassword, admin.password);
        if (!isPasswordValid) return res.status(401).json({ message: 'Current password is incorrect' });

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        admin.password = hashedPassword;
        await admin.save();

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Manage users (buyers and sellers)
const getAllUsers = async (req, res) => {
    try {
        const buyers = await Buyer.find().select('-password'); // Exclude passwords
        const sellers = await Seller.find().select('-password'); // Exclude passwords
        res.json({ buyers, sellers });
    } catch (error) {
        console.error("Error fetching users:", error); // Log the error for debugging
        res.status(500).json({ message: 'Server error', error });
    }
};

// Fetch buyers
const getAllBuyers = async (req, res) => {
    try {
        const buyers = await Buyer.find().select('-password'); // Exclude passwords
        res.json(buyers);
    } catch (error) {
        console.error("Error fetching buyers:", error);
        res.status(500).json({ message: 'Server error', error });
    }
};

// Fetch sellers
const getAllSellers = async (req, res) => {
    try {
        const sellers = await Seller.find().select('-password'); // Exclude passwords
        res.json(sellers);
    } catch (error) {
        console.error("Error fetching sellers:", error);
        res.status(500).json({ message: 'Server error', error });
    }
};


module.exports = { getAllBuyers, getAllSellers, getAllUsers, adminLogin, getAdminProfile, updateAdminPassword };


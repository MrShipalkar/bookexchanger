const Seller = require('../models/Seller');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Seller signup
// Seller signup
const sellerSignup = async (req, res) => {
    try {
        const { name, email, password, sellerType, shopName, shopAddress } = req.body;

        // Check if sellerType is valid
        if (!['shop owner', 'student'].includes(sellerType)) {
            return res.status(400).json({ message: 'Invalid seller type. Must be "shop owner" or "student".' });
        }

        // Validate shop details for shop owners
        if (sellerType === 'shop owner' && (!shopName || !shopAddress)) {
            return res.status(400).json({ message: 'Shop name and address are required for shop owners.' });
        }

        // Check if seller already exists
        const existingSeller = await Seller.findOne({ email });
        if (existingSeller) return res.status(400).json({ message: 'Seller already exists' });

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Prepare seller data
        const sellerData = { name, email, password: hashedPassword, sellerType };
        if (sellerType === 'shop owner') {
            sellerData.shopName = shopName;
            sellerData.shopAddress = shopAddress;
        }

        // Save the seller
        const seller = new Seller(sellerData);
        await seller.save();

        // Generate JWT token
        const token = jwt.sign({ id: seller._id, role: 'seller' }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.status(201).json({ token, message: 'Seller created successfully', sellerType });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Seller login
const sellerLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const seller = await Seller.findOne({ email });
        if (!seller) return res.status(404).json({ message: 'Seller not found' });

        const isPasswordValid = await bcrypt.compare(password, seller.password);
        if (!isPasswordValid) return res.status(401).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: seller._id, role: 'seller' }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.status(200).json({ token, message: 'Login successful' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

module.exports = { sellerSignup, sellerLogin };

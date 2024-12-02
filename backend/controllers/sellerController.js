const Seller = require('../models/Seller');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Seller signup
const sellerSignup = async (req, res) => {
    try {
        const { name, email, password, shopName, shopAddress } = req.body;

        const existingSeller = await Seller.findOne({ email });
        if (existingSeller) return res.status(400).json({ message: 'Seller already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const seller = new Seller({ name, email, password: hashedPassword, shopName, shopAddress });
        await seller.save();

        const token = jwt.sign({ id: seller._id, role: 'seller' }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.status(201).json({ token, message: 'Seller created successfully' });
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

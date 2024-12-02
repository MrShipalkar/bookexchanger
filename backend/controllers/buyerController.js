const Buyer = require('../models/Buyer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Buyer signup
const buyerSignup = async (req, res) => {
    try {
        const { name, email, password, address } = req.body;

        const existingBuyer = await Buyer.findOne({ email });
        if (existingBuyer) return res.status(400).json({ message: 'Buyer already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const buyer = new Buyer({ name, email, password: hashedPassword, address });
        await buyer.save();

        const token = jwt.sign({ id: buyer._id, role: 'buyer' }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.status(201).json({ token, message: 'Buyer created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Buyer login
const buyerLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const buyer = await Buyer.findOne({ email });
        if (!buyer) return res.status(404).json({ message: 'Buyer not found' });

        const isPasswordValid = await bcrypt.compare(password, buyer.password);
        if (!isPasswordValid) return res.status(401).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: buyer._id, role: 'buyer' }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.status(200).json({ token, message: 'Login successful' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

module.exports = { buyerSignup, buyerLogin };

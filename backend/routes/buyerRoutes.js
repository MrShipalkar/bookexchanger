const express = require('express');
const { buyerSignup, buyerLogin } = require('../controllers/buyerController');

const router = express.Router();

router.post('/signup', buyerSignup); // Buyer signup
router.post('/login', buyerLogin);   // Buyer login

module.exports = router;

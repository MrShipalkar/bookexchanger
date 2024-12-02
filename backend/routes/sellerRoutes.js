const express = require('express');
const { sellerSignup, sellerLogin } = require('../controllers/sellerController');

const router = express.Router();

router.post('/signup', sellerSignup); // Seller signup
router.post('/login', sellerLogin);   // Seller login

module.exports = router;

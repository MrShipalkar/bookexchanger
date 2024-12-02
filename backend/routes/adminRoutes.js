const express = require('express');
const { adminLogin, getAdminProfile, updateAdminPassword, getAllUsers,  getAllBuyers, getAllSellers } = require('../controllers/adminController');
const { verifyToken } = require('../middlewares/authMiddleware');

const router = express.Router();

// Admin login route
router.post('/login', adminLogin);

// Protected routes for admin actions
router.get('/profile', verifyToken, getAdminProfile);
router.put('/password', verifyToken, updateAdminPassword);
router.get('/users', verifyToken, getAllUsers);
router.get('/buyers', verifyToken, getAllBuyers);
router.get('/sellers', verifyToken, getAllSellers);

module.exports = router;

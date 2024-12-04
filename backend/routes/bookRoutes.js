const express = require('express');
const { verifyToken } = require('../middlewares/authMiddleware'); // Authentication middleware
const upload = require('../middlewares/uploadMiddleware'); // Multer for file uploads
const {
    addBook,
    getAllBooks,
    getBookById,
    updateBook,
    deleteBook
} = require('../controllers/bookController');

const router = express.Router();

// Add a book (protected route for sellers)
router.post('/add-book', verifyToken, upload.array('images', 5), addBook);

// Get all books (public route with optional filters)
router.get('/list-books', getAllBooks);

// Get a specific book by ID (public route)
router.get('/book/:id', getBookById);

// Update a book (protected route for sellers)
router.put('/update-book/:id', verifyToken, updateBook);

// Delete a book (protected route for sellers)
router.delete('/delete-book/:id', verifyToken, deleteBook);

module.exports = router;

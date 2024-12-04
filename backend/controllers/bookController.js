const Book = require('../models/Book');

const addBook = async (req, res) => {
    try {
        const { title, author, genre, description, price, rentPrice, isRentable, condition, publicationDate } = req.body;

        // Check for missing required fields
        if (!title || !author || !price) {
            return res.status(400).json({ message: 'Title, Author, and Price are required' });
        }

        // Handle uploaded images (if any)
        const images = req.files ? req.files.map(file => file.path) : [];

        // Create the book entry
        const book = new Book({
            title,
            author,
            genre,
            description,
            price,
            rentPrice: isRentable ? rentPrice : undefined,
            isRentable: !!isRentable,
            condition,
            publicationDate,
            images,
            seller: req.user.id, // Assuming `req.user` contains the authenticated seller's ID
        });

        await book.save();

        res.status(201).json({ message: 'Book added successfully', book });
    } catch (error) {
        console.error('Error adding book:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};

//Fetch all books with optional filtering by title, author, genre, or availability.
const getAllBooks = async (req, res) => {
    try {
        const { title, author, genre, isAvailable } = req.query;

        // Build the query object dynamically based on filters
        const query = {};
        if (title) query.title = new RegExp(title, 'i'); // Case-insensitive search
        if (author) query.author = new RegExp(author, 'i'); // Case-insensitive search
        if (genre) query.genre = genre;
        if (isAvailable) query.status = isAvailable === 'true' ? 'available' : 'rented';

        const books = await Book.find(query).populate('seller', 'name email'); // Populate seller details

        res.status(200).json(books);
    } catch (error) {
        console.error('Error fetching books:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};

// Fetch a single book by ID
const getBookById = async (req, res) => {
    try {
        const { id } = req.params;

        const book = await Book.findById(id).populate('seller', 'name email'); // Populate seller details
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.status(200).json(book);
    } catch (error) {
        console.error('Error fetching book:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};

//Allow sellers to update their books. Only fields provided in the request body will be updated.
const updateBook = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the book and check if the authenticated seller owns it
        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        if (book.seller.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Unauthorized to update this book' });
        }

        // Define allowed fields for updating
        const allowedUpdates = [
            'title',
            'author',
            'genre',
            'description',
            'price',
            'rentPrice',
            'isRentable',
            'condition',
            'publicationDate',
        ];

        // Update only allowed fields
        Object.keys(req.body).forEach(key => {
            if (allowedUpdates.includes(key)) {
                book[key] = req.body[key];
            }
        });

        // Handle uploaded images (if any)
        if (req.files && req.files.length > 0) {
            book.images = req.files.map(file => file.path);
        }

        await book.save();

        res.status(200).json({ message: 'Book updated successfully', book });
    } catch (error) {
        console.error('Error updating book:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};


//Allow sellers to delete their books.
const deleteBook = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the book and check if the authenticated seller owns it
        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        if (book.seller.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Unauthorized to delete this book' });
        }

        await book.deleteOne();

        res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
        console.error('Error deleting book:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};


module.exports = {
    addBook,
    getAllBooks,
    getBookById,
    updateBook,
    deleteBook,
};


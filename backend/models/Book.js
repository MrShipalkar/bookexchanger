const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true }, // Title of the book
    author: { type: String, required: true }, // Author of the book
    genre: { type: String }, // Genre (e.g., Fiction, Non-Fiction)
    description: { type: String }, // Brief description of the book
    price: { type: Number, required: true }, // Price for selling the book
    rentPrice: { type: Number }, // Price for renting the book
    isRentable: { type: Boolean, default: false }, // Indicates if the book can be rented
    condition: { type: String, enum: ['new', 'good', 'average', 'poor'], default: 'good' }, // Condition of the book
    publicationDate: { type: Date }, // Date when the book was published
    images: [{ type: String }], // Array of URLs for book images
    recommendations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }], // Related books for recommendations
    ratings: {
        average: { type: Number, default: 0 }, // Average rating of the book
        reviews: [
            {
                buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'Buyer' },
                rating: { type: Number, min: 1, max: 5 },
                comment: { type: String },
                createdAt: { type: Date, default: Date.now },
            },
        ],
    },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'Seller', required: true }, // Reference to the seller
    status: { type: String, enum: ['available', 'sold', 'rented'], default: 'available' }, // Status of the book
    rentalStart: { type: Date }, // Current rental start date (if rented)
    rentalEnd: { type: Date }, // Current rental end date (if rented)
    rentalHistory: [
        {
            renter: { type: mongoose.Schema.Types.ObjectId, ref: 'Buyer' }, // Buyer who rented the book
            rentalStart: { type: Date }, // Start date of the rental
            rentalEnd: { type: Date }, // End date of the rental
            totalCost: { type: Number }, // Total cost for the rental
        },
    ], // History of rentals for the book
}, {
    timestamps: true, // Adds createdAt and updatedAt fields
});

module.exports = mongoose.model('Book', bookSchema);

import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import "./Homepage.css";

const Home = () => {
    return (
        <div>
            <Navbar />
            <main className="home-container">
                {/* Hero Section */}
                <section className="hero">
                    <h1>Exchange, Buy, and Rent Books with Ease</h1>
                    <p>Discover a wide variety of books at affordable prices, or exchange your old ones!</p>
                    <div className="cta-buttons">
                        <button className="btn btn-primary">Buy Books</button>
                        <button className="btn btn-secondary">Sell Books</button>
                    </div>
                </section>

                {/* Features Section */}
                <section className="features">
                    <h2>Why Choose Us?</h2>
                    <div className="features-grid">
                        <div className="feature-card">
                            <i className="icon books-icon"></i>
                            <h3>Wide Range of Books</h3>
                            <p>Choose from thousands of titles across various genres.</p>
                        </div>
                        <div className="feature-card">
                            <i className="icon rent-icon"></i>
                            <h3>Easy Renting & Buying</h3>
                            <p>Seamlessly exchange or rent books with just a few clicks.</p>
                        </div>
                        <div className="feature-card">
                            <i className="icon price-icon"></i>
                            <h3>Affordable Prices</h3>
                            <p>Get the best deals on books, both new and used.</p>
                        </div>
                    </div>
                </section>

                {/* Explore Books Section */}
                <section className="explore-books">
                    <h2>Explore Popular Books</h2>
                    <div className="books-grid">
                        {/* Replace with dynamic data */}
                        <div className="book-card">
                            <img src="https://via.placeholder.com/150" alt="Book Cover" />
                            <h3>Book Title</h3>
                            <p>Price</p>
                        </div>
                        <div className="book-card">
                            <img src="https://via.placeholder.com/150" alt="Book Cover" />
                            <h3>Book Title</h3>
                            <p>Price</p>
                        </div>
                        <div className="book-card">
                            <img src="https://via.placeholder.com/150" alt="Book Cover" />
                            <h3>Book Title</h3>
                            <p>Price</p>
                        </div>
                    </div>
                    <button className="btn btn-view-all">View All Books</button>
                </section>

                {/* How It Works Section */}
                <section className="how-it-works">
                    <h2>How It Works</h2>
                    <div className="steps">
                        <div className="step">
                            <i className="icon step1-icon"></i>
                            <h3>Step 1</h3>
                            <p>Sign up as a buyer or seller.</p>
                        </div>
                        <div className="step">
                            <i className="icon step2-icon"></i>
                            <h3>Step 2</h3>
                            <p>Browse or list books easily.</p>
                        </div>
                        <div className="step">
                            <i className="icon step3-icon"></i>
                            <h3>Step 3</h3>
                            <p>Complete your exchange or purchase.</p>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default Home;

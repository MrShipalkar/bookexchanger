import React from "react";
import "./Footer.css";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                {/* Logo and Tagline */}
                <div className="footer-logo">
                    {/* <img src="/logo.png" alt="BookExchanger Logo" className="logo" /> */}
                    <h2>Book<span className="highlight">X</span>changer</h2>
                    <p>Best Recycle is Book Recycle.</p>
                </div>

                {/* Social Media Links */}
                <div className="footer-social">
                    <h3>Get in Touch</h3>
                    <div className="social-icons">
                        <a href="#" aria-label="Facebook">
                            <i className="fab fa-facebook"></i>
                        </a>
                        <a href="#" aria-label="Instagram">
                            <i className="fab fa-instagram"></i>
                        </a>
                        <a href="#" aria-label="LinkedIn">
                            <i className="fab fa-linkedin"></i>
                        </a>
                        <a href="#" aria-label="GitHub">
                            <i className="fab fa-github"></i>
                        </a>
                        <a href="#" aria-label="Email">
                            <i className="fas fa-envelope"></i>
                        </a>
                    </div>
                </div>

                {/* Quick Links */}
                <div className="footer-links">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/books">Books</a></li>
                        <li><a href="/about">About Us</a></li>
                        <li><a href="/sell-books">Sell Books</a></li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

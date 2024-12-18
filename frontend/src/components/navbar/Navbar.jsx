import React, { useState } from "react";
import "./Navbar.css";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false); // State to toggle the dropdown menu

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen); // Toggle menu state
    };

    return (
        <nav className="navbar">
            {/* Logo Section */}
            <div className="navbar-logo">
                <span className="navbar-title">Book<span className="highlight">X</span>changer</span>
            </div>

            {/* Hamburger Icon for Mobile */}
            <div className="hamburger" onClick={toggleMenu}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </div>

            {/* Navigation Links */}
            <ul className={`navbar-links ${isMenuOpen ? "active" : ""}`}>
                <li><a href="/">Home</a></li>
                <li><a href="/books">Books</a></li>
                <li><a href="/about">About Us</a></li>
                <li>
                    <button className="btn btn-signup">Buy Books</button>
                </li>
                <li>
                    <button className="btn btn-sell">Sell Books</button>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;

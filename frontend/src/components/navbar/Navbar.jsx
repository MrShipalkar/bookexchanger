import React from "react";
import "./Navbar.css";

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                {/* <img src="/logo.png" alt="BookExchanger Logo" className="logo" /> */}
                <span className="navbar-title">Book<span className="highlight">X</span>changer</span>
            </div>
            <ul className="navbar-links">
                <li><a href="/">Home</a></li>
                <li><a href="/books">Books</a></li>
                <li><a href="/about">About Us</a></li>
            </ul>
            <div className="navbar-buttons">
                <button className="btn btn-signup">Sign Up</button>
                <button className="btn btn-sell">Sell Books</button>
            </div>
        </nav>
    );
};

export default Navbar;

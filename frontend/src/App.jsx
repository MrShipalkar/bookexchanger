import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/homepage/Homepage";
import Books from "./pages/books/Books";
import AboutUs from "./pages/about/AboutUs";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/books" element={<Books />} />
                <Route path="/about" element={<AboutUs />} />
            </Routes>
        </Router>
    );
};

export default App;

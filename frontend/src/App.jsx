import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
// import BuyerSignup from "./pages/BuyerSignup";
// import SellerSignup from "./pages/SellerSignup";
// import Login from "./pages/Login";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                {/* <Route path="/buyer-signup" element={<BuyerSignup />} />
                <Route path="/seller-signup" element={<SellerSignup />} />
                <Route path="/login" element={<Login />} /> */}
            </Routes>
        </Router>
    );
};

export default App;

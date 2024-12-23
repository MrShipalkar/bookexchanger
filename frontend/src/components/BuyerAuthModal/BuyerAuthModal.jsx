import React, { useState } from "react";
import { buyerSignup, buyerLogin } from "../../services/buyerService"; // Import services
import "./BuyerAuthModal.css";

const BuyerAuthModal = ({ isOpen, onClose }) => {
    const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        address: "",
    });
    const [error, setError] = useState(""); // Error state for API feedback

    const resetForm = () => {
        setFormData({
            name: "",
            email: "",
            password: "",
            address: "",
        });
        setError("");
        setIsLogin(true); // Optionally reset to Login mode
    };

    const toggleAuthMode = () => {
        setIsLogin(!isLogin);
        setError(""); // Reset error when switching modes
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = isLogin
                ? await buyerLogin({ email: formData.email, password: formData.password })
                : await buyerSignup(formData);

            // Handle successful response
            alert(response.message);
            resetForm(); // Reset form after successful submission
            onClose(); // Close the modal
        } catch (error) {
            // Handle API errors
            setError(error.response?.data?.message || "Something went wrong");
        }
    };

    const handleModalClose = () => {
        resetForm(); // Reset form fields when modal is closed
        onClose();
    };

    if (!isOpen) return null; // Do not render the modal if not open

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <button className="close-button" onClick={handleModalClose}>
                    ✖
                </button>
                <h2>{isLogin ? "Login as Buyer" : "Signup as Buyer"}</h2>
                <form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="Enter your name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="address">Address</label>
                                <input
                                    type="text"
                                    id="address"
                                    name="address"
                                    placeholder="Enter your address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </>
                    )}
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    <button type="submit" className="auth-button">
                        {isLogin ? "Login" : "Signup"}
                    </button>
                </form>
                <p onClick={toggleAuthMode} className="toggle-link">
                    {isLogin
                        ? "Don't have an account? Signup"
                        : "Already have an account? Login"}
                </p>
            </div>
        </div>
    );
};

export default BuyerAuthModal;

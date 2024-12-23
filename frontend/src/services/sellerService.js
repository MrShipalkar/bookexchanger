import axios from "./apiConfig";

// Seller Signup API
export const sellerSignup = async (data) => {
    const response = await axios.post("/api/seller/signup", data);
    return response.data;
};

// Seller Login API
export const sellerLogin = async (data) => {
    const response = await axios.post("/api/seller/login", data);
    return response.data;
};

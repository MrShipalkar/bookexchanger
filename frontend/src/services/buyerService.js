import axios from "./apiConfig";

// Buyer Signup API
export const buyerSignup = async (data) => {
    const response = await axios.post("/api/buyer/signup", data);
    return response.data;
};

// Buyer Login API
export const buyerLogin = async (data) => {
    const response = await axios.post("/api/buyer/login", data);
    return response.data;
};

const jwt = require('jsonwebtoken');

// Verify token middleware
const verifyToken = (req, res, next) => {
    const token = req.headers['auth-token']; // Look for 'auth-token' header
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: Token is required' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify JWT
        req.user = decoded; // Attach decoded payload to request
        next(); // Proceed to next middleware or controller
    } catch (error) {
        res.status(403).json({ message: 'Invalid or expired token', error });
    }
};

module.exports = { verifyToken };

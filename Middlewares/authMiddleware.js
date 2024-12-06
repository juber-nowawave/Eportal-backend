// middleware/authMiddleware.js
const User = require('../Models/User');
const EmployeeProfile = require("../Models/Employee")
const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
    // Extract token from the Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            success: false,
            message: "Token missing",
        });
    }

    const token = authHeader.split(' ')[1]; // Get the token after "Bearer"

    try {
        // Verify the token using the JWT secret
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach user to the request object
        req.user = await EmployeeProfile.findById(decoded._id);
        
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "User not found",
            });
        }

        next(); // Move to the next middleware
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid token",
            error: error.message,
        });
    }
};


module.exports = authMiddleware;

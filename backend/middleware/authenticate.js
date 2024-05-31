const jwt = require('jsonwebtoken');
require('dotenv').config()
/**
 * Middleware function to authenticate requests using JWT tokens.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function in the stack.
 *
 * @returns {void}
 */
const authenticate = (req, res, next) => {
    /**
     * Extract the JWT token from the request headers.
     *
     * @type {string}
     */
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

    // If token is not provided, return a 401 Unauthorized response.
    if (token == null) {
        return res.status(401).json({ message: 'Access Token Diperlukan. Mohon Untuk Login' });
    }

    // Verify the JWT token using the secret key.
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        // If token is invalid, return a 403 Forbidden response.
        if (err) {
            return res.status(403).json({ message: 'Invalid Token. Mohon Untuk Login' });
        }

        // Store user information in the request object for further use.
        req.user = user;

        // Call the next middleware or route handler.
        next();
    });
};

module.exports = authenticate;
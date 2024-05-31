/**
 * Middleware function to verify JWT and check admin role.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function in the stack.
 *
 * @returns {void}
 */
const verifyAdmin = (req, res, next) => {
    /**
     * Extracts the JWT token from the request headers.
     *
     * @type {string}
     */
    const token = req.headers['authorization'].split(' ')[1];

    // Check if token is provided
    if (!token) {
        return res.status(403).json({ success: false, message: 'No token provided' });
    }

    // Verify JWT token
    jwt.verify(token, secretKey, (err, decoded) => {
        // Handle JWT verification errors
        if (err) {
            return res.status(403).json({ success: false, message: 'Failed to authenticate token' });
        }

        // Check if user role is admin
        if (decoded.role!== 'admin') {
            return res.status(403).json({ success: false, message: 'Access denied: Admins only' });
        }

        // Attach decoded user data to request object
        req.user = decoded;

        // Proceed to next middleware function
        next();
    });
};

module.exports = verifyAdmin;
/**
 * Function to handle user login.
 * @param {Object} req - The request object containing the user's login credentials.
 * @param {Object} res - The response object to send back to the client.
 * @returns {void}
 */
const logIn = async (req, res) => {
    // Connect to the database
    await connectDB();

    // Check if the request body is empty
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({
            success: false,
            message: 'Login gagal. Data Form Kosong'
        });
    }

    // Extract username and password from the request body
    const { username, password } = req.body;

    try {
        // Find the user in the database
        const user = await findUser(username);

        // If user not found, return unauthorized status
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Login gagal. Username tidak ditemukan'
            });
        }

        // Check if the password matches
        const isPasswordMatch = user.password === password;

        // If password does not match, return unauthorized status
        if (!isPasswordMatch) {
            return res.status(401).json({
                success: false,
                message: 'Login gagal. Username atau Password Salah'
            });
        }

        // Create payload for JWT
        const payload = {
            userId: user.userId,
            name: user.name,
            role: user.role
        };

        // Sign the JWT with the secret key and expiration time
        const token = jwt.sign(payload, secretKey, { expiresIn: '30m' });

        // Return success status with the JWT token
        return res.status(200).json({
            success: true,
            message: 'Login Berhasil',
            token: token
        });
    } catch (err) {
        // Log the error and return server error status
        console.error(err);
        return res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan saat login'
        });
    }
};

/**
 * Function to find a user in the database by their username.
 * @param {string} username - The username to search for.
 * @returns {Object} The user object if found, otherwise null.
 */
async function findUser(username) {
    const user = await client.db('LaBooking').collection('Users').findOne({ username: username });
    return user;
}

// Export the logIn function
module.exports = {logIn};
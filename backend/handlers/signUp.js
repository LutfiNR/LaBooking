const { UUID } = require("mongodb");
const { client, connectDB } = require("../database/connection");

/**
 * Handles user sign up process for multiple users.
 *
 * @param {Object} req - The request object containing user data.
 * @param {Object} res - The response object to send back to the client.
 * @returns {void}
 */
const signUpMultiple = async (req, res) => {
    // Connect to the database
    await connectDB();

    // Check if request body is empty
    if (!req.body || !Array.isArray(req.body) || req.body.length === 0) {
        return res.status(400).json({
            success: false,
            message: 'SignUp gagal. Data Form Kosong'
        });
    }

    const users = req.body; // Array of user objects

    try {
        const existingUsers = await client.db('LaBooking').collection('Users')
            .find({ username: { $in: users.map(user => user.username) } })
            .toArray();

        if (existingUsers.length > 0) {
            return res.status(409).json({
                success: false,
                message: 'SignUp gagal. Beberapa username sudah ada',
                existingUsernames: existingUsers.map(user => user.username)
            });
        }

        // Create new users
        const newUsers = users.map(({ username, password, name, angkatan }) => ({
            userId: new UUID(),
            username,
            password,
            name,
            angkatan,
            role: "user"
        }));

        // Insert all new users into the database
        const result = await client.db('LaBooking').collection('Users').insertMany(newUsers);

        // Check if the users were successfully inserted
        if (result.insertedCount > 0) {
            return res.status(201).json({
                success: true,
                message: 'SignUp Berhasil',
                data: newUsers
            });
        } else {
            return res.status(500).json({
                success: false,
                message: 'SignUp gagal. Tidak bisa menambahkan ke database'
            });
        }
    } catch (err) {
        // Log any errors and send a generic error response
        console.error(err);
        return res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan saat SignUp'
        });
    }
};

module.exports = { signUpMultiple };

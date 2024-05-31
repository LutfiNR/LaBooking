/**
 * Handles user sign up process.
 *
 * @param {Object} req - The request object containing user data.
 * @param {Object} res - The response object to send back to the client.
 * @returns {void}
 */
const signUp = async (req, res) => {
    // Connect to the database
    await connectDB();

    // Check if request body is empty
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({
            success: false,
            message: 'SignUp gagal. Data Form Kosong'
        });
    }

    // Destructure user data from request body
    const { username, password, name, angkatan } = req.body;

    try {
        // Check if username already exists in the database
        const usernameExist = await client.db('LaBooking').collection('Users').findOne({ username });

        if (usernameExist) {
            return res.status(409).json({
                success: false,
                message: 'SignUp gagal. Username sudah ada'
            });
        }

        // Create a new user object with UUID and user data
        const newUser = {
            userId: new UUID(),
            username,
            password,
            name,
            angkatan,
            role: "user"
        };

        // Insert the new user into the database
        const result = await client.db('LaBooking').collection('Users').insertOne(newUser);

        // Check if the user was successfully inserted
        if (result.insertedId) {
            return res.status(201).json({
                success: true,
                message: 'SignUp Berhasil',
                data: newUser
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

module.exports = {signUp};
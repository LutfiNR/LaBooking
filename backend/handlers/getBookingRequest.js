/**
 * Retrieves all booking requests from the database.
 *
 * @param {Object} req - The request object containing user information.
 * @param {Object} res - The response object to send back to the client.
 * @returns {void}
 */
const getBookingRequest = async (req, res) => {
    await connectDB();  // Ensure the database connection is awaited

    // Check if the user is an admin
    if (req.user.role!== "admin") {
        // Return a 403 Forbidden status if the user is not an admin
        return res.status(403).json({
            success: false,
            message: 'Mohon Maaf Hanya Admin Yang Dapat Mengakses'
        });
    }

    try {
        // Fetch all booking requests from the database
        const bookingRequest = await client.db('LaBooking').collection('Schedules').find().toArray();
        // Return a 200 OK status with the booking requests
        res.status(200).json(bookingRequest);
    } catch (error) {
        // Log the error and return a 500 Internal Server Error status
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};

module.exports = { getBookingRequest };
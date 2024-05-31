/**
 * Handles the booking process.
 *
 * @param {Object} req - The request object containing user data and booking details.
 * @param {Object} res - The response object to send back to the client.
 * @returns {void}
 */
const booking = async (req, res) => {
    // Ensure the database connection is awaited
    await connectDB();

    // Check if the request body exists
    if (req.body) {
        try {
            // Create a new booking request object
            const newRequest = {
                requestId: new UUID(),
                name: req.user.name,
                activity: req.body.activity,
                start: req.body.start,
                end: req.body.end,
                dosen: req.body.dosen,
                phone: req.body.phone,
                status: "Pending"
            };

            // Await the insertion of the new booking request into the database
            await client.db('LaBooking').collection('Schedules').insertOne(newRequest);

            // Retrieve the inserted booking request from the database
            const schedules = await client.db('LaBooking').collection('Schedules').find({ requestId: newRequest.requestId }).toArray();

            // Check if the booking request was successfully inserted
            if (schedules.length > 0) {
                // Send a success response with the inserted booking request data
                res.status(201).json({
                    success: true,
                    message: 'Pemesanan Berhasil. Mohon tunggu untuk di cek oleh admin',
                    data: schedules
                });
            } else {
                // Send a failure response if the booking request was not inserted
                res.status(500).json({
                    success: false,
                    message: 'Pemesanan gagal. Tidak bisa menambahkan ke database'
                });
            }
        } catch (error) {
            // Log the error and send a server error response
            console.error(error);
            res.status(500).json({
                success: false,
                message: 'Internal Server Error'
            });
        }
    } else {
        // Send a bad request response if the request body is empty
        res.status(400).json({
            success: false,
            message: 'Booking gagal. Data Form Kosong'
        });
    }
};

// Export the booking function
module.exports = { booking }
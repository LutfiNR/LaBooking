/**
 * Handles the approval or decline of booking requests.
 *
 * @param {Object} req - The request object containing user information and request body.
 * @param {Object} res - The response object to send back to the client.
 * @returns {void}
 */
const requestAction = async (req, res) => {
    // Connect to the database
    await connectDB();

    // Check if the user is an admin
    if (req.user.role!== "admin") {
        return res.status(403).json({
            success: false,
            message: 'Mohon Maaf Hanya Admin Yang Dapat Mengakses'
        });
    }

    try {
        const { id, action } = req.body;

        // If action is approve
        if (action === "approve") {
            const result = await client.db('LaBooking').collection('Schedules').updateOne(
                { requestId: new UUID(`${id}`) },
                { $set: { status: "Approved" } }
            );

            // If booking is found and updated
            if (result.modifiedCount > 0) {
                res.status(200).json({ success: true, message: 'Booking approved successfully' });
            } else {
                res.status(404).json({ success: false, message: 'Booking not found or already approved' });
            }
        }

        // If action is decline
        if (action === "decline") {
            const result = await client.db('LaBooking').collection('Schedules').deleteOne({ requestId: new UUID(`${id}`) });

            // If booking is found and deleted
            if (result.deletedCount > 0) {
                res.status(200).json({ success: true, message: 'Booking deleted successfully' });
            } else {
                res.status(404).json({ success: false, message: 'Booking not found' });
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

module.exports = { requestAction };
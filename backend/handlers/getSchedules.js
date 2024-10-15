const {client, connectDB } = require("../database/connection");
/**
 * Retrieves and processes schedules from the database.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 *
 * @returns {void}
 */
const getSchedules = async (req, res) => {
    // Connect to the database
    await connectDB();

    try {
        // Fetch all approved schedules from the database
        const schedules = await client.db('LaBooking').collection('Schedules').find({ status: "Approved" }).toArray();

        // Process the schedules into a format suitable for the calendar component
        const dataResponse = schedules.map((schedule) => {
            return {
                title: `${schedule.activity} - ${schedule.dosen}`,
                start: schedule.start,
                end: schedule.end,
            };
        });

        // Send the processed schedules as a JSON response
        res.status(200).json(dataResponse);
    } catch (err) {
        // Log the error and send an internal server error response
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};

// Export the getSchedules function
module.exports = {getSchedules};

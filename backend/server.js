/**
 * This is the main entry point of the application.
 * It sets up the server using Express.js and applies necessary middleware.
 *
 * @requires dotenv
 * @requires cors
 * @requires body-parser
 * @requires express
 * @requires./routes/route
 */

// Import required modules
require('dotenv').config()
const cors = require('cors')
const bodyParser = require('body-parser')
const express = require('express')
const router = require('./routes/route')

// Initialize Express app
const app = express();

/**
 * The port number on which the server will listen.
 * It is read from the environment variables.
 *
 * @constant {number} PORT
 */
const PORT = process.env.PORT

// Apply middleware
app.use(cors()) // Enable Cross-Origin Resource Sharing
app.use(bodyParser.json()) // Parse incoming request bodies in a middleware before your handlers
app.use('/', router) // Use the router defined in routes/route.js

/**
 * Start the server and listen on the specified port.
 * Log a message to the console when the server starts.
 *
 * @param {number} PORT - The port number on which the server will listen.
 * @returns {void}
 */
app.listen(PORT,()=>{
    console.log(`App run in port ${PORT}`);
})
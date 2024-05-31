/**
 * Express Router for handling various API endpoints.
 * @module router
 */

const express = require('express')
const { getSchedules } = require('../handlers/getSchedules')
const { signUp } = require('../handlers/signUp')
const { logIn } = require('../handlers/logIn')
const authenticate = require('../middleware/authenticate')
const { booking } = require('../handlers/booking')
const { getBookingRequest } = require('../handlers/getBookingRequest')
const verifyAdmin = require('../middleware/verifyAdmin')
const { requestAction } = require('../handlers/requestAction')

/**
 * Express Router instance.
 * @type {express.Router}
 */
const router = express.Router()

/**
 * GET request for retrieving schedules.
 * @name GET/schedules
 * @function
 * @memberof module:router
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 */
router.get("/schedules", getSchedules)

/**
 * POST request for user signup.
 * @name POST/signup
 * @function
 * @memberof module:router
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 */
router.post("/signup", signUp)

/**
 * POST request for user login.
 * @name POST/login
 * @function
 * @memberof module:router
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 */
router.post("/login", logIn)

/**
 * POST request for booking a schedule. Requires authentication.
 * @name POST/booking
 * @function
 * @memberof module:router
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 */
router.post("/booking", authenticate, booking)

/**
 * GET request for retrieving booking requests. Requires admin authentication.
 * @name GET/admin
 * @function
 * @memberof module:router
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 */
router.get("/admin", verifyAdmin, getBookingRequest)

/**
 * PUT request for approving or rejecting booking requests. Requires admin authentication.
 * @name PUT/request-action
 * @function
 * @memberof module:router
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 */
router.put("/request-action", verifyAdmin, requestAction)

module.exports = router
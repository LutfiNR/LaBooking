/**
 * This module connects to MongoDB using the provided URI and exports the client and connectDB function.
 * 
 * @module db
 */

// Import required modules
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');

// Load MongoDB URI from environment variables
const uri = process.env.DB_URL;

/**
 * Creates a new MongoClient instance and connects to the MongoDB server.
 * 
 * @type {MongoClient} client - The MongoClient instance.
 */
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  
/**
 * Connects to the MongoDB server and sends a ping command to confirm a successful connection.
 * 
 * @returns {Promise<void>} - A promise that resolves when the connection is successful or rejects with an error.
 */
async function connectDB() {
    try {
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } catch (error) {
        console.error('Error:', error);
    }
}

/**
 * Exports the MongoClient instance and connectDB function.
 * 
 * @exports {MongoClient} client - The MongoClient instance.
 * @exports {function} connectDB - The connectDB function.
 */
module.exports = {client,connectDB}
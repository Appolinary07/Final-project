// Import necessary modules
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
require('dotenv').config();

// Initialize the Express app and set the port
const app = express();
const port = process.env.PORT || 5000;

// Middleware setup
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.static('public')); // Serve static files from the 'public' folder
app.use(express.json()); // Parse JSON request bodies

// Database connection setup
const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost', // Database host
    user: process.env.DB_USER || 'root',      // Database username
    password: process.env.DB_PASSWORD || '',  // Database password
    database: 'hospital_db'                  // Target database
}).promise(); // Use promises for cleaner async/await syntax

// === API ROUTES ===

// Add a new patient
app.post('/patients', async (req, res) => {
    try {
        // Extract patient details from the request body
        const { name, sickness, date_admitted, date_discharged } = req.body;
        const [firstName] = name.split(' '); // Extract the first name from the name string

        // Insert patient details into the database
        const [result] = await db.execute(
            `
            INSERT INTO Patients (first_name, diagnosis, date_admitted, date_discharged)
            VALUES (?, ?, ?, ?)
            `,
            [firstName, sickness, date_admitted, date_discharged || null]
        );

        // Send a success response
        res.status(201).json({ 
            id: result.insertId, 
            message: 'Patient added successfully' 
        });
    } catch (error) {
        console.error('Error adding patient:', error);
        res.status(500).json({ error: 'Failed to add patient' });
    }
});

// Get all patients
app.get('/patients', async (req, res) => {
    try {
        // Fetch patient data from the database
        const [rows] = await db.query(
            `
            SELECT 
                CONCAT(first_name, ' ', COALESCE(last_name, '')) AS name,
                diagnosis AS sickness,
                date_admitted,
                date_discharged
            FROM Patients
            ORDER BY date_admitted DESC
            `
        );

        // Send the fetched data as a response
        res.json(rows);
    } catch (error) {
        console.error('Error fetching patients:', error);
        res.status(500).json({ error: 'Failed to fetch patients' });
    }
});

// === ERROR HANDLING MIDDLEWARE ===
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

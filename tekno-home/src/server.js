// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors'); // For handling CORS

// Initialize Express app
const app = express();
const PORT = 3000;

// Middleware configurations
app.use(bodyParser.json()); // Parse JSON request body
app.use(cors()); // Enable CORS for all routes

// Database connection configuration
const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test'
});

// Connect to the database
mysqlConnection.connect((err) => {
    if (!err) {
        console.log('DB connection succeeded.');
    } else {
        console.log('DB connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
    }
});

// Function to generate a random 3-digit number
function generateRandomId() {
    return Math.floor(Math.random() * 900) + 100; // This will generate a random number between 100 and 999
}

// Function to generate a random 3-digit number
function generateRandomId() {
    return Math.floor(Math.random() * 900) + 100; // This will generate a random number between 100 and 999
}

// Add a new customer
app.post('/addCustomer', (req, res) => {
    const customer = req.body;
    const customerId = generateRandomId(); // Generate a random 3-digit customer ID

    // SQL query to insert a new customer with the random ID
    const sql = 'INSERT INTO customer (ID_Customer, Name_Customer, `e-mail_Customer`, Phone_Number, Date_Customer, Customer_desc) VALUES (?, ?, ?, ?, ?, ?)';
    
    mysqlConnection.query(sql, [customerId, customer.Name_Customer, customer["e-mail_Customer"], customer.Phone_Number, customer.Date_Customer, customer.Customer_desc], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ success: false, message: 'Failed to add a new customer.' });
        }
        
        // Only send a response once inside this callback
        console.log('Received data:', req.body);
        res.status(200).json({ success: true, message: 'Customer added successfully.' });
    });
});



// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

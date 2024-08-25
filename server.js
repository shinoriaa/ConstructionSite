const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database');
const cors = require('cors');

const app = express();
const port = 5500;

// Middleware
app.use(cors()); // Enable CORS
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (e.g., HTML forms)
app.use(express.static('public'));

// Route to handle form submission for quotes
app.post('/quote', (req, res) => {
    const { name, email, phone, message } = req.body;

    // Insert data into the quotes table
    db.run(`INSERT INTO quotes (name, email, phone, message) VALUES (?, ?, ?, ?)`,
        [name, email, phone, message],
        function (err) {
            if (err) {
                console.error("Database insertion error (quotes):", err.message);
                return res.status(500).send('Error occurred while saving your request.');
            }
            res.send('Your quote request has been sent successfully. Thank you!');
        }
    );
});

// Route to handle form submission for contact
app.post('/contact', (req, res) => {
    const { name, email, subject, message } = req.body;

    // Insert data into the contacts table
    db.run(`INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)`,
        [name, email, subject, message],
        function (err) {
            if (err) {
                console.error("Database insertion error (contacts):", err.message);
                return res.status(500).send('Error occurred while saving your contact request.');
            }
            res.send('Your message has been sent successfully. Thank you!');
        }
    );
});

// Route to fetch all contacts (for testing purposes)
app.get('/contacts', (req, res) => {
    db.all('SELECT * FROM contacts', (err, rows) => {
        if (err) {
            return res.status(500).send('Error occurred while fetching contacts.');
        }
        res.json(rows);
    });
});

app.post('/service_requests', (req, res) => {
    const { name, email, service_type, description } = req.body;
    db.run(`INSERT INTO service_requests (name, email, service_type, description) VALUES (?, ?, ?, ?)`, [name, email, service_type, description], function(err) {
        if (err) {
            console.error('Error inserting into service_requests table:', err.message);
            res.status(500).send('Internal Server Error');
        } else {
            res.status(200).send('Service request submitted successfully');
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

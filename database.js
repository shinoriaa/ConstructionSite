const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('mydatabase.db');

// Reset tables each time by dropping them if they exist and recreating them
db.serialize(() => {
    db.run('DROP TABLE IF EXISTS quotes', (err) => {
        if (err) {
            console.error('Error dropping quotes table:', err.message);
        }
    });

    db.run('DROP TABLE IF EXISTS contacts', (err) => {
        if (err) {
            console.error('Error dropping contacts table:', err.message);
        }
    });

    // Create the quotes table
    db.run(`CREATE TABLE IF NOT EXISTS quotes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT,
        message TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`, (err) => {
        if (err) {
            console.error('Error creating quotes table:', err.message);
        }
    });

    // Create the contacts table
    db.run(`CREATE TABLE IF NOT EXISTS contacts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        subject TEXT NOT NULL,
        message TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`, (err) => {
        if (err) {
            console.error('Error creating contacts table:', err.message);
        }
    });

    db.run(`CREATE TABLE IF NOT EXISTS service_requests (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        service_type TEXT NOT NULL,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`, (err) => {
        if (err) {
            console.error('Error creating service_requests table:', err.message);
        }
    });
});

module.exports = db;

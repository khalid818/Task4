const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');

const app = express();
const PORT = 3000;

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'database'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log('Connected to the database.');
});

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/save-transcript', (req, res) => {
    const transcript = req.body.transcript;

    const query = 'INSERT INTO transcripts (text) VALUES (?)';
    db.query(query, [transcript], (err, result) => {
        if (err) {
            res.status(500).json({ message: 'Database error' });
        } else {
            res.status(200).json({ message: 'Transcript saved' });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

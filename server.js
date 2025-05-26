// server.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const pool = require('./db'); // Import connection pool

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

// Routes
app.post('/submit-form', (req, res) => {
  const { name, email, message } = req.body;
  pool.query(
    'INSERT INTO submissions (name, email, message) VALUES (?, ?, ?)',
    [name, email, message],
    (err, results) => {
      if (err) {
        console.error('Error inserting data:', err);
        res.status(500).send('Database error');
      } else {
        res.status(200).send('Submission saved!');
      }
    }
  );
});

app.get('/submissions', (req, res) => {
  pool.query('SELECT * FROM submissions', (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      res.status(500).send('Database error');
    } else {
      res.json(results);
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

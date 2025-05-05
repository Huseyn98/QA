require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

// MySQL connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to MySQL database.');
});

// ✅ Endpoint to handle form submission
app.post('/submit-form', (req, res) => {
    const { name, email, message } = req.body;
    console.log('Raw form data:', req.body);  // still logs the form data
  
    const query = 'INSERT INTO submissions (name, email, message) VALUES (?, ?, ?)';
    db.query(query, [name, email, message], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            res.status(500).send('Database error');
        } else {
            console.log('Data inserted:', result);
            res.send('Thank you for your submission!');
        }
    });
});

app.get('/submissions', (req, res) => {
  db.query('SELECT * FROM submissions', (err, results) => {
      if (err) {
          console.error('Error fetching data:', err);
          res.status(500).send('Database error');
      } else {
          res.json(results); // Sends the data as JSON
      }
  });
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

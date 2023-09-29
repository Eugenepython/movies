const express = require('express');
const app = express();
const cors = require('cors');
const { Pool } = require('pg'); 

const path = require('path');
const dotenvPath = path.join(__dirname, '..', '.env');
require('dotenv').config({ path: dotenvPath });


const thePool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

const prodFrontendURL = 'https://movie-client-production.up.railway.app/'  // this is the frontend URL

const corsOptions = {
  origin: prodFrontendURL,
};

const PORT = process.env.PG_PORT || 3000;



console.log(thePool)

let theValue = 'default value'

thePool.query('SELECT * FROM favorite_movies', (error, result) => {
  if (error) {
    console.error('Error executing query:', error);
  } else {
    console.log('Query result:', result.rows);
  }
});


console.log(theValue)
app.use(cors(corsOptions));
app.use(express.json());

app.post('/submit', (req, res) => {
    console.log('Received POST request:', req.body);
    //res.send({ message: 'ok', data: req.body }); 
    const valueToStore = req.body;
    console.log('valueToStore:', valueToStore.director);
    thePool.query(
    'INSERT INTO favorite_movies (title, director, release_year) VALUES ($1, $2, $3)', 
    [valueToStore.title, valueToStore.director, valueToStore.year],
    (error, result) => {
      if (error) {
        console.error('Error executing query:', error);
        res.status(500).send({ error: 'An error occurred' });
      } else {
        console.log('Query result:', result.rows);
        res.send({ message: 'ok', data: req.body });
      }
    });
  });

  app.get('/submit', (req, res) => {
    // Handle the GET request logic here
    res.send(theValue);
  });
  

app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`);
});

//will this allow in production, for this backend to access the frontned in railway?  
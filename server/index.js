const db = require('../database/index.js');
const bodyParser = require('body-parser');
const express = require('express');
const Promise = require('bluebird');


const app = express();
app.use(express.static(`${__dirname}/../client/dist`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.get('/', (req, res) => res.send('Welcome to some random ass home page'));

// app.post('/insertUser/:id', (req, res) => {
//   db.connect()
//     .then(() => console.log('successful connection'))
//     .then(() => {
//       return db.query(``)
//     })
// });

/*
#########################Types of Queries#########################
Get shufflePlays for a day
Get regularPlays for a day
Shuffle Vs RegularPlays?

Get shufflePlays for a week
ShuffleOlays for a week
Shuffle Vs Regular for a week




##################################################################
*/



app.listen(3000);

const db = require('../database/index.js');
const bodyParser = require('body-parser');
const express = require('express');
const Promise = require('bluebird');


const app = express();
app.use(express.static(`${__dirname}/../client/dist`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send('Welcome to the home inventory service'));



app.listen(process.env.PORT || 3000);

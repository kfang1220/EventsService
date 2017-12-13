const db = require('../database/index.js');
const express = require('express');
const Promise = require('bluebird');


const app = express();
app.use(express.static(`${__dirname}/../client/dist`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => res.send('Welcome to the home inventory service'));

app.listen(process.env.PORT || 3000);

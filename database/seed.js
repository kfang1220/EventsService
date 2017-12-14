const initOptions = {
  // initialization options;
};
const faker = require('faker');
const Promise = require('bluebird');
// const db = require('../database/index.js');
const pgp = require('pg-promise')();
const shortid = require('shortid');


// const dropDB = 'DROP DATABASE IF EXISTS events';
// const createDB = 'CREATE DATABASE events';
// const connectDB = '\\connect events';

const configObj = {
  host: 'localhost',
  port: 5432,
  database: 'events',
  user: 'kevinfang',
  password: '',
};

const cn = 'postgres://kevinfang:\'\'@localhost:5432/events';
let db = pgp(cn);

/*
  Started connection, option to drop/create database and tables after connection
*/
db.connect()
  .then(() => {
    console.log('successful connection');
    const promises = [];

    for (var i = 0; i < 1000; i++) {
      let name = faker.name.findName();
      let userId = shortid.generate();
      let location;
    }
  });

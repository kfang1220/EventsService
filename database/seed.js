const initOptions = {
  // initialization options;
};
const faker = require('faker');
const Promise = require('bluebird');
// const db = require('../database/index.js');
// var pgp = require('pg-promise')({ promiseLib: Promise });
const shortid = require('shortid');


const dropDB = 'DROP DATABASE IF EXISTS events';
const createDB = 'CREATE DATABASE events';
const connectDB = '\\connect events';
const dropUsers = 'DROP TABLE IF EXISTS users';

// const createUsers =
//   `CREATE TABLE users (
//     user_id INTEGER NOT NULL,
//     user_name VARCHAR(30) NOT NULL,
//     location_id INTEGER NOT NULL,
//     PRIMARY KEY (user_id)
//   )`;

const insertUserValues = 'INSERT INTO users (name, userId, location) VALUES (?, ?, ?);';

let states = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District of Columbia', 'Federated States of Micronesia', 'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
  'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina',
  'North Dakota', 'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island',
  'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Island', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];


const configObj = {
  host: 'localhost',
  port: 5432,
  // database: 'events',
  user: 'will',
  password: 'weewfwe'
};

const pgp = require('pg-promise')(initOptions);

// using an invalid connection string:
const db = pgp('postgresql://kevinfang:\'\'@localhost:5432/events');
// let db = pgp(configObj);

/*
  Started connection, option to drop/create database and tables after connection
*/
db.connect()
  .then(() => console.log('successful connectuon'))
  .catch(error => {
    console.log('error');
  })
  .then(() => {
    const promises = [];

    for (var i = 0; i < 10; i++) {
      let name = faker.name.findName();
      let userId = shortid.generate();
      let location = Math.floor(Math.random() * (50)) + 1;


      let promise = db.query(insertUserValues, name);
      // .then(() => connection.query(insertIntoJoin, [user, name]));
      promises.push(promise);
    }
    return Promise.all(promises);


  });
// .then(() => db.query(dropDB))
// .then(() => db.query(createDB))
// .then(() => db.query(connectDB))
// .then(() => console.log('\\connect events'));
// .then(() => db.query(dropUsers, console.log('USERS TABLE DROPPED')));
// .then(() => db.query(createUsers), console.log('USERS TABLE CREATED'));
// .then(() => {
//   console.log('successful connection');
//   const promises = [];
//
//   for (var i = 0; i < 1000; i++) {
//     let name = faker.name.findName();
//     let userId = shortid.generate();
//     let location;
//   }
// });

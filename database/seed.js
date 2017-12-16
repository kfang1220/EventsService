const initOptions = {
  // initialization options;
};
const faker = require('faker');
const Promise = require('bluebird');
// const db = require('../database/index.js');
var pgp = require('pg-promise')({ promiseLib: Promise });
const shortid = require('shortid');
const moment = require('moment');


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

const insertUserValues = 'INSERT INTO users (user_id, user_name, location_id) VALUES (?, ?, ?)';

let states = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
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

// const pgp = require('pg-promise')(initOptions);

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
    let brokenPromises = [];

    for (let i = 0; i < 50; i++) {
      let location = faker.address.state();
      let promise = db.query(`INSERT INTO location (location_name) VALUES ('${states[i]}')`);
      brokenPromises.push(promise);
    }
    return Promise.all(brokenPromises);
  })
  .then(() => console.log('Locations Table Filled'))
  .then(() => {
    let brokenPromises = [];

    for (var i = 0; i < 100; i++) {
      let name = faker.name.findName();
      // let userId = shortid.generate();
      // let userId = (Math.floor(Math.random() * (100000)) + 1);
      let userId = i + 1;
      let location = Math.floor(Math.random() * (50)) + 1;


      let promise = db.query(`INSERT INTO users (user_id, user_name, location_id) VALUES ('${userId}', '${name}', '${location}')`);
      // .then(() => connection.query(insertIntoJoin, [user, name]));
      brokenPromises.push(promise);
    }
    return Promise.all(brokenPromises);
  })
  .then(() => console.log('Users Table Filled'))
  .then(() => {
    let brokenPromises = [];

    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();

    newdate = month + '/' + day + '/' + year;
    // let today = db.query(current_timestamp);
    // console.log(today);
    for (let i = 0; i < 100; i++) {
      let tempDate = moment().format();
      let promise = db.query(`INSERT INTO calendar (month_date_year, day, month, year) VALUES ('${tempDate}', '${day}', '${month}', '${year}')`);
      brokenPromises.push(promise);
    }
    return Promise.all(brokenPromises);
  })
  .then(() => console.log('Calendar Table Filled'))
  .then(() => {
    let brokenPromises = [];

    for (var i = 0; i < 100; i++) {
      let id = i + 1;
      let dateId = i + 1;
      let shufflePlay = (Math.floor(Math.random() * (100000)) + 1);
      let regularPlay = (Math.floor(Math.random() * (100000)) + 1);
      let shuffleSkip = (Math.floor(Math.random() * (100000)) + 1);
      let regularSkip = (Math.floor(Math.random() * (100000)) + 1);

      let promise = db.query(`INSERT INTO userSongStatistics (user_id_users, date_id_calendar, shuffle_play_count, regular_play_count, shuffle_skip_count, regular_skip_count) VALUES ('${id}', '${dateId}', '${shufflePlay}', '${regularPlay}', '${shuffleSkip}', '${regularSkip}')`);
      brokenPromises.push(promise);
    }
    return Promise.all(brokenPromises);
  })
  .then(() => console.log('userSongStatistics Table Filled'));

//
//
// });
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

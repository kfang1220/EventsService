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
  .catch(error => console.log('error'))
  .then(() => {
    let brokenPromises = [];
    for (let i = 0; i < 50; i++) {
      //let location = faker.address.state();
      let promise = db.query(`INSERT INTO location (location_name) VALUES ('${states[i]}')`);
      brokenPromises.push(promise);
    }
    return Promise.all(brokenPromises);
  })
  .catch(error => console.log('EROR INSERTING STATES'))
  .then(() => console.log('Locations Table Filled'))
  .then(() => {
    let brokenPromises = [];
    for (var i = 0; i < 100; i++) {
      let name = 'Andrew';
      // console.log(name);
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
  .catch(error => console.log(error, 'EROR INSERTING USERS'))
  .then(() => console.log('Users Table Filled'))
  .then(() => {
    let brokenPromises = [];
    // let dateObj = new Date() || dateObj;
    // var day = dateObj.getUTCDate();
    // let week = day / 7;
    // var month = dateObj.getUTCMonth() + 1; //months from 1-12
    // var year = dateObj.getUTCFullYear();
    // dateObj = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
    // newdate = month + '/' + day + '/' + year;
    // let today = db.query(current_timestamp);
    // console.log(today);
    for (let i = 1; i < 366; i++) {
      // let tempDate = moment().format();
      dateObj = new Date(new Date().getTime() + (i * 24) * 60 * 60 * 1000);
      var day = dateObj.getUTCDate();
      let week = Math.floor(day / 7);
      var month = dateObj.getUTCMonth() + 1; //months from 1-12
      var year = dateObj.getUTCFullYear();
      // dateObj = new Date(new Date().getTime() + (i * 24) * 60 * 60 * 1000);
      //console.log(day, week, month, year, i);
      let promise = db.query(`INSERT INTO calendar (day, week, month, year) VALUES (${day}, ${week}, ${month}, ${year})`);
      brokenPromises.push(promise);
    }
    return Promise.all(brokenPromises);
  })
  .catch(error => console.log('EROR INSERTING CALENDAR DATES', error))
  .then(() => console.log('Calendar Table Filled'))
  .then(() => {
    let brokenPromises = [];

    for (let j = 0; j < 365; j++) {
      let dateId = j + 1;
      for (let i = 0; i < 100; i++) {
        let id = i + 1;
        let shufflePlay = (Math.floor(Math.random() * (100000)) + 1);
        let regularPlay = (Math.floor(Math.random() * (100000)) + 1);
        let shuffleSkip = (Math.floor(Math.random() * (100000)) + 1);
        let regularSkip = (Math.floor(Math.random() * (100000)) + 1);
        let promise = db.query(`INSERT INTO userSongStatistics (user_id_users, date_id, shuffle_play_count, regular_play_count, shuffle_skip_count, regular_skip_count) VALUES ('${id}', '${dateId}', '${shufflePlay}', '${regularPlay}', '${shuffleSkip}', '${regularSkip}')`);
        brokenPromises.push(promise);
      }
    }
    return Promise.all(brokenPromises);
  })
  .then(() => console.log('userSongStatistics Table Filled'))
  .then(() => {
    let brokenPromises = [];
    for (let j = 0; j < 365; j++) {
      let dateId = j + 1;
      for (let i = 0; i < 100; i ++) {
        let id = i + 1;
        let query = faker.internet.domainWord();
        let queryCount = (Math.floor(Math.random() * (10000)) + 1);
        let promise = db.query(`INSERT INTO userQueryStatistics (user_id_users, date_id, query_string, query_count) VALUES ('${id}', '${dateId}', '${query}', '${queryCount}')`);
        brokenPromises.push(promise);
      }

    }
    return Promise.all(brokenPromises);
  })
  .then(() => console.log('userQueryStatistics Table Filled'))
  .then(() => {
    let brokenPromises = [];
    let m = 0;
    for (let j = 0; j < 365; j++) {
      let dateId = j + 1;
      for (let i = 0; i < 50; i++) {
        let id = i + 1;
        for (let k = 0; k < 5; k++) {
          let songId = m + 1;
          m++;
          let songLength = (Math.floor((Math.random() * 5) + 1)) * 100;
          let promise = db.query(`INSERT INTO songSession (user_id_users, date_id, song_id, song_length) VALUES (${id}, ${dateId}, ${songId}, ${songLength})`);
          brokenPromises.push(promise);
        }
      }

    }
    return Promise.all(brokenPromises);
  })
  .then(() => console.log('songSession Table Filled'))
  .then(() => {
    let brokenPromises = [];
    for (let i = 0; i < 100; i++) {
      let songId = i + 1;
      for (let j = 0; j < 5; j++) {
        let seconds = (Math.floor((Math.random() * 60) + 1));
        let promise = db.query(`INSERT INTO songChunks (chunk_length, song_id) VALUES ('${seconds}', '${songId}')`);
        brokenPromises.push(promise);
      }
    }
    return Promise.all(brokenPromises);
  })
  .then(() => console.log('songChunks Table Filled'))
  .then(() => console.log('SEEDING COMPLETE'));

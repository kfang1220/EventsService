const initOptions = {
  // pg-promise initialization options...
  connect(client, dc, isFresh) {
    const cp = client.connectionParameters;
    console.log('Connected to database:', cp.database);
  }

};

// Loading and initializing the library:
const pgp = require('pg-promise')(initOptions);
const Promise = require('bluebird');

const configObj = {
  host: 'localhost',
  port: 5432,
  database: 'events',
  user: 'kevinfang',
  password: '',
};

const db = pgp(configObj);


// const initialize = () => (db.connect()
//   .then(() => console.log('Connection to PostGres successful!'))
//   .catch(err => console.log('There is something wrong with your connection!'))
//   // .then(() => db.query('DROP DATABASE IF EXISTS events'))
//   // .then(() => db.query('CREATE DATABASE events'))
//   .then(() => db.query('CREATE TABLE users ( ' +
//   'user_id INTEGER NOT NULL PRIMARY KEY, ' +
//   'user_name VARCHAR(30) NULL DEFAULT NULL, ' +
//   'location_id INTEGER NOT NULL REFERENCES location (location_id)'))
// );

// const selectAllUsers = function (callback) {
//   db.query('SELECT * FROM users', (err, results, fields) => {
//     if (err) {
//       callback(err, null);
//     } else {
//       callback(null, results);
//     }
//   });
// };

// Exporting the database object for shared use:
//module.exports.selectAll = selectAllUsers;
module.exports.db = db;

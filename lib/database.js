'use strict';

// load deps
const Promise = require('bluebird');
const mongoose = require('mongoose');

const db = {
  User: Promise.promisifyAll(require('../user/user-model'))
};

const DB_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/test';

// connect to the database
mongoose.connect(DB_URI);

db['mongo'] = mongoose.connection;

db['mongo'].on('connected', onDatabaseConnection);
db['mongo'].on('disconnected', onDatabaseDisconnection);
db['mongo'].on('error', onDatabaseError);

module.exports = db;

/**
 *
 * When the database is ready, log it!
 *
 */
function onDatabaseConnection () {
  console.log('Database connection is open!');
}

/**
 *
 * When the database is disconnected, log it!
 *
 */
function onDatabaseDisconnection () {
  console.log('Database connection is lost');
}

/**
 *
 * When the database has an error, log it!
 *
 */
function onDatabaseError (err) {
  console.log('Database connection has an error: ' + err);
}

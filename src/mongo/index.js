/* eslint-disable no-console */

const mongoose = require('mongoose');
const chalk = require('chalk');

function initDB() {
  const uri = 'mongodb://yozhik:pass@ds211289.mlab.com:11289/hh_jobs';
  mongoose.connect(uri);
  const db = mongoose.connection;
  db.on('error', err => console.log(chalk.red(err)));

  db.once('open', () => {
    console.log(chalk.blue(`Successfully connected to ${uri}`));
  });

  db.once('disconnected', () => {
    console.log(chalk.red(`Disconnected from ${uri}`));
  });
}

module.exports = initDB;

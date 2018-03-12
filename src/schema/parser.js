/* @flow */

const { parseToDB } = require('.');
const initDB = require('../mongo');

initDB();

parseToDB();

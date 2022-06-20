import { isDbConnected } from './lib/isDbConnected';
var express = require('express');
var dotenv = require('dotenv');
var app = require('express')();
const cookieParser = require('cookie-parser');
const path = require('path');
const createError = require('http-errors');

dotenv.config();

const serverPort = process.env.SERVER_PORT;

const testDbConnection = isDbConnected();

if (!serverPort) {
  console.log('❌ No Server port provided, update your .env file!');
} else if (!testDbConnection) {
  console.log('❌ Failed to connect to database');
} else {
  app.listen({ port: serverPort }, () =>
    console.log(`🚀 Server ready at http://localhost:${serverPort}`)
  );
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', require('./routes/users'));
app.use('/roles', require('./routes/roles'));

module.exports = app;

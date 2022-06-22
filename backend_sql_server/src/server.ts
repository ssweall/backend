var express = require('express');
var dotenv = require('dotenv');
var app = require('express')();
const cookieParser = require('cookie-parser');
const path = require('path');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

dotenv.config();

const serverPort = process.env.SERVER_PORT;
const cors = require('cors');
app.use(cors({origin: '*'}));

if (!serverPort) {
  console.log('❌ No Server port provided, update your .env file!');
} else {
  app.listen({ port: serverPort }, () =>
    console.log(`🚀 Server ready at http://localhost:${serverPort}`)
  );
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.use('/users', require('./routes/users'));
app.use('/roles', require('./routes/roles'));

module.exports = app;

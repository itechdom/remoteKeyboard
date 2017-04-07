// =================================================================
// get the packages we need ========================================
// =================================================================
var express 	= require('express');
var app         = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');
var config = require('config'); // get our config file

// =================================================================
// configuration ===================================================
// =================================================================
var port = config.get('server.port'); // used to create, sign, and verify tokens
var ip = config.get('server.ip');
//mongoose.connect(`${config.get('db.host')}:${config.get('db.port')}`); // connect to database
app.set('superSecret', config.secret); // secret variable

// =================================================================
// Import web services ========================================
// =================================================================
var User   = require('./db-service/user'); // get our mongoose model

import authService from './auth-service/auth-service.js'
const authApi = authService({app,User});

import helloService from './hello-service/hello-service.js'
const helloApi = helloService({app,User});

import dbService from './db-service/db-service.js'
const dbApi = dbService({app});

import passportService from './passport-service/passport-service.js'
const passportApi = passportService({app,User,config});

import socketService from './socket-service/socket-service.js'
const socketApi = socketService({app});

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));

// ==========
// Register Services
// ==========

//app.use('/', authApi);
app.use('/hello',helloApi);
//app.use('/db',dbApi);
//app.use('/',passportApi);

app.use('/socket-io',socketApi);

// =================================================================
// start the server ================================================
// =================================================================
app.listen(port,ip);
console.log('Magic happens at http://localhost:' + port);

'use strict';

var express = require('express'),
    routes = require('./app/routes/index.js'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    session = require('express-session');

var app = express();
require('dotenv').load();
require('./app/config/passport')(passport);
//var uri = 'mongodb://testuser:testpassword@ds151078.mlab.com:51078/heroku_h4h7rgj4';
var uri = 'mongodb://localhost:27017/clementinejs';
mongoose.connect(uri);

app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
app.use('/public', express.static(process.cwd() + '/public'));
app.use('/common', express.static(process.cwd() + '/app/common'));

app.use(session({
    secret: 'secretClementine',
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

routes(app,passport);

var port = process.env.PORT || 8080;
app.listen(port, function () {
    console.log('Node.js listening on port ' + port + '...');
});
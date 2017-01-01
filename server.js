'use strict';

var express = require('express'),
    routes = require('./app/routes/index.js'),
    mongo = require('mongodb').MongoClient;

var app = express();

var uri = 'mongodb://testuser:testpassword@ds151078.mlab.com:51078/heroku_h4h7rgj4';
//console.log(process.env.MONGOLAB_URI + '/clementinejs');
//mongo.connect(process.env.MONGOLAB_URI + '/clementinejs' || "mongodb://" + process.env.IP + ":27017/file-meta" || 'mongodb://localhost:27017/clementinejs', function (err, db) {
mongo.connect(uri || 'mongodb://localhost:27017/clementinejs', function (err, db) {

    if (err) {
        throw new Error('Database failed to connect!');
    } else {
        console.log('MongoDB successfully connected on port 27017.');
    }

    app.use('/public', express.static(process.cwd() + '/public'));
    app.use('/controllers', express.static(process.cwd() + '/app/controllers'));

    routes(app, db);

    app.listen(process.env.PORT || 8080, function () {
        console.log('Listening on port 3000...');
    });

});
var MongoClient = require('mongodb').MongoClient;
var connection;
var mongoose = require('mongoose');

var connect = function (url, done) {

    if (connection) return done();

    mongoose.connect(url, function (err, db) {
        if (err) {
            return done('Unable to connect to the mongoDB server. Error:', err);
        }
        connection = db;
        console.log("DB connection ready");
        done();
    });

    mongoose.connection.on('connected', function () {
        console.log('Mongoose connected to ' + url);
    });

    mongoose.connection.on('error', function (err) {
        console.log('Mongoose connection error: ' + err);
    });

    mongoose.connection.on('disconnected', function () {
        console.log('Mongoose disconnected');
    });

    process.on('SIGINT', function () {
        mongoose.connection.close(function () {
            console.log('Mongoose disconnected through app termination');
            process.exit(0);
        });
    });
};
var get = function () {
    return connection;
};
var close = function (done) {
    if (connection) {
        connection.close(function (err, result) {
            connection = null;
            done(err)
        })
    }
};


module.exports.connect = connect;
module.exports.get = get;
module.exports.close = close;
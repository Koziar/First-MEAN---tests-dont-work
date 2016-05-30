var connection = require("../db/db"),
    ObjectId = require('mongodb').ObjectID;
    Joke = require('./jokeSchema');
/*
 Querying MongoDB without mongooose
 Using the connection made from db.js
 */

function _allJokes(callback) {
    //An empty query document ({}) selects all documents in the collection:
    Joke.find({}, function (err, data) {
        if (err) {
            callback(err);
        } else {
            callback(null, data);
        }
    });
}

function _addJoke(jokeToAdd, callback) {
    Joke.insertOne({jokeToAdd}, function (err, data) {
        if (err) {
            callback(err, null);
        }
        else {
            callback(null, data);
        }
    });
}

function _findJoke(id, callback) {
    //Returns one document that satisfies the specified query criteria.
    Joke.find({"_id": ObjectId(id)}, function (err, data) {
        if (err) {
            callback(err);
        } else {
            callback(null, data);
        }
    });
}

function _editJoke(jokeToEditID, newJokeText, callback) {
    Joke.updateOne({
        "_id": ObjectId(jokeToEditID)
    }, {
        $set: {
            "joke": newJokeText,
            "lastEdited": new Date()
        }
    }, function (err, data) {
        if (err) {
            callback(err, null);
        }
        else {
            callback(null, data);
        }
    });
}

function _deleteJoke(id, callback) {
    Joke.deleteOne({"_id": ObjectId(id)}, function (err, data) {
        if (err) {
            callback(err, null);
        }
        else {
            callback(null, data);
        }
    });
}


function _randomJoke(callback) {
    Joke.find({}, function (err, data) {
        if (err) {
            callback(err);
        } else {
            var random = Math.floor((Math.random() * data.length));
            var randomElement = data[random];
            callback(null, randomElement);
        }
    })
}

module.exports = {
    allJokes: _allJokes,
    addJoke: _addJoke,
    findJoke: _findJoke,
    editJoke: _editJoke,
    deleteJoke: _deleteJoke,
    randomJoke: _randomJoke
};
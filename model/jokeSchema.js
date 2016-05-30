// grab the things we need
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// create a schema
var jokeSchema = new Schema({
    joke: String,
    type: Array,
    reference: {author: String, link: String},
    lastEdited: {type: Date, default: Date.now}
});

jokeSchema.pre('save', function (next) {
    var currentDate = new Date();

    this.lastEdited = currentDate;

    if (!this.lastEdited) {
        this.lastEdited = currentDate;
    }

    next();
});

jokeSchema.post('save', function (doc, next) {
    console.log("Schema saved");
    next();
});

jokeSchema.get = function (key) {
    return this.options[key];
};

// the schema is useless so far
// we need to create a model using it
var Joke = mongoose.model('Joke', jokeSchema);
// ready to go!

module.exports = Joke;

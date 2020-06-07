// Importing the necessary dependencies
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SchemaTypes = mongoose.Schema.Types;


// Defining the schema of our MongoDB database
const books = new Schema({
    "Title": String,
    "Author": String,
    "Notes" : [String]
},{collection: "Books"});


module.exports = books;
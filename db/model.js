// Importing the necessary dependencies
const mongoose = require('mongoose');
const books = require('./Schema');

// Logic for which model to use when
module.exports =  (connection = null)=>{
    let model;
    if(connection) {
        model = connection.model('Books' , books);
    }
    else {
        model = mongoose.model('Books' , books)
    }

    return model
};
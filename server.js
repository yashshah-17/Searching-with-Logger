// Importing the necessary dependencies
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./logger/index');
const cors = require('cors');
const mongoConnection = require('./db/connection').start();
const path = require('path')
const fs = require('fs');
const model = require('./db/model')();
const app = express();


// Defining the required variables
let  dataToBeLogged = '';
let log = [];


// Building and starting the frontend (React)
app.use(express.static(path.join(`${__dirname}`,'frontend', 'build')));
app.use(bodyParser.json());
app.use(cors());


// APIs of our application
app.get('/', (req,res) => {
    res.sendFile(path.join(`${__dirname}`,'frontend', 'build', 'index.html'))
});

app.get('/books', async (req,res) => {
    let books =[];
    const author = req.query.author;
    await model.find({Author: author}).exec((err, data) => {
        res.json(data).status(200);
    });
});

app.post('/logs', (req,res) => {
    try {
        let found =false;
        const search = req.body.search;
        console.log(log);
        if (log.length !== 0) {
            for(let logData of log){
                console.log(logData.author , '-', search);
                if (logData.author === search) {
                    logData.hits+=1;
                    found = true;
                    dataToBeLogged =    `Author: ${logData.author} , hits: ${logData.hits}`
                    break;
                }
            }
        }
        if(!found) {
            log.push({
                author: search,
                hits:1
            });
            dataToBeLogged =    `Author: ${search} , hits: 1`
        }
        logger.info(dataToBeLogged);
        res.status(200).json({
            statusCode:200,
            message: 'Log preserved successfully'
        })
    } catch(e) {
        console.log(e);
        res.status(500).json({
            statusCode: 500,
            message: 'Internal server error',
            error: e
        })
    }
});

app.post('/notes', async (req,res) => {
    try {
        const book = req.body.book;
        const note = req.body.note;
        console.log(book,note);

        await model.findOneAndUpdate({Title: book},{ $push: { Notes: note } },{upsert: true}).exec((err, data) => {
            res.json({
                statusCode: 200,
                books: 'Notes added sucessfully'
            }).status(200);
        });
    }catch(e) {
        console.log(e);
        res.status(500).json({
            statusCode: 500,
            message: 'Internal server error',
            error: e
        });
    }
});


// Indicating and starting the server
app.listen(3001, () => {
    console.log("Express server running on port 3001")
});
const mongoose = require('mongoose');

mongoose.start = start = async () => {
    try{
        await mongoose.connect('mongodb://mongo:27017/Assignment-3');
        console.log("connected to database: Assignment-3");

    }
    catch (err) {
        console.warn(err);
    }

};

mongoose.close = close = async () => {
    try {
        await mongoose.connection.close();
        console.log("mongodb has been disconnected")
    }  catch (err) {
        console.warn(err)
    }
};



// Fix depreciation warnings
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true );

module.exports = mongoose;
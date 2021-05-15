const mongoose = require('mongoose');
const keys = require('./keys');


const connectDB = async () => {
    try {
        await mongoose.connect(keys.mongoURI, {
            // mongoose deprecation warning handlers
            // REFERENCE https://mongoosejs.com/docs/deprecations.html 
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
        console.log("[DATABASE] MongoDB connected")
    } catch(err) {
        console.error(err.message);
        process.exit(1);
    }
}

module.exports = connectDB;
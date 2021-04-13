const  mongoose = require('mongoose');

// creating the user schema with the appropriate validation constraints in the mongoose model
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    }, 
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    gravatar: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});
// exporting the mongoose User model
module.exports = User = mongoose.model('user', UserSchema);
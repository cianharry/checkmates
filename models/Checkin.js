const mongoose = require('mongoose');

// creating the Checkin schema with the appropriate validation constraints in the mongoose model
// Foreign Key reference of the User model
const CheckinSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    title: {
        type: String,
        required: true
    },
    emotion: {
        type: String,
        required: true
    },
    intensity: {
        type: String,
        required: true
    },
    maintext: {
        type: String,
        required: true
    },
    reactions: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'users'
            }
        }
    ],
    comments: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'users'
            },
            text: {
                type: String,
                required: true
            },
            name: {
                type: String,
            },
            avatar: {
                type: String,
                required: true
            },
            date: {
                type: date,
                default: Date.now
            }
        }
    ],
    date: {
        type: date,
        default: Date.now
    }
});

module.exports = Checkin = mongoose.model('checkin', CheckinSchema);
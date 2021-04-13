const  mongoose = require('mongoose');

// creating the Profile schema with the appropriate validation constraints in the mongoose model
// Foreign Key reference of the User model
const ProfileSchema = new mongoose.Schema({ 
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user'
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String
    },
    bio: {
        type: String,
        min: 16
    },
    url: {
        type: String
    },
    milestones: [
        {
            title: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: true
            },
            dateAcheived: {
                type: Date,
                required: true
            }
        }
    ],
    social: {
        youtube: {
            type: String
        },
        instagram: {
            type: String
        },
        facebook: {
            type: String
        },
        twitter: {
            type: String
        },
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
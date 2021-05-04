const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    chat:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'chat'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    message: {
        type: String,
        reuired: true
    }

})

module.exports = Message = mongoose.model('message', MessageSchema);
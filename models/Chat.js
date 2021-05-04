const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true 
    }
})

module.exports = Chat = mongoose.model('chat', ChatSchema);
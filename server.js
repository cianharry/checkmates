const express = require('express');
const connectDB = require('./config/db')
const path = require('path')
const auth = require('./middle/auth');
var cors = require('cors');
const jwt = require('jsonwebtoken')
const config = require('config');

const app = express();

const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: {
      origin: '*',
    }
  });

// Connection to mongoDB
connectDB();

// Middleware for body parser
app.use(express.json({ extended: false }));
app.use(cors())

// Define Routes to be used
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/checkins', require('./routes/api/checkins'));
app.use('/api/chats', require('./routes/api/chats'));
//app.use('/api/message', require('./routes/api/message'));

// serve static assets in production
if(process.env.NODE_ENV === 'production') {
    // serve static folder
    app.use(express.static('cm-client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'cm-client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`[SERVER] Server started on port: ${PORT}`));

io.use( async (socket, next) => {
    try {
        const token = socket.handshake.query.token
        next()
    } catch (error) {
        console.log('socket error')
    }
})
  
// socket io connection
// ReqId:   R0 
// TestId:  T058
io.on('connection', (socket) => {
    console.log(`Connected: ${socket.id}`)
    socket.emit('message', 'Welcome to Checkmates Chat')
    // broadcast when a user joins
    socket.broadcast.emit('message', 'A user has joined the chat')

    socket.on('disconnect', () => {
        console.log('User Disconnected: ')
        io.emit('message', 'A user has left the chat')
    })

    socket.on('joinRoom', ({userName, room}) => {
        socket.join(room)
        console.log(`User ${userName} joined chat => ${room}`)
    })

    socket.on('leaveRoom', ({userName, room}) => {
        socket.leave(room)
        console.log(`${userName} has left chat room ${room}`)
    })

    socket.on('sendMessage', ({room, content}) => {
        socket.to(room).emit('receiveMessage', content)
        console.log(`Message received from ${content.userName}: \n${content.message}`)
    })
})
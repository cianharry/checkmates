const express = require('express');
const connectDB = require('./config/db')
const path = require('path')

const app = express();

// Connection to mongoDB
connectDB();

// Middleware for body parser
app.use(express.json({ extended: false }));

// Define Routes to be used
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/checkins', require('./routes/api/checkins'));

// serve static assets in production
if(process.env.NODE_ENV === 'production') {
    // serve static folder
    app.use(express.static('cm-client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'cm-client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`[SERVER] Server started on port: ${PORT}`));
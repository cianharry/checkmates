const express = require('express');
const connectDB = require('./config/db')

const app = express();

// Connection to mongoDB
connectDB();

// Middleware for body parser
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API test running'));

// Define Routes to be used
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/checkins', require('./routes/api/checkins'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log('Server started on port '+PORT));
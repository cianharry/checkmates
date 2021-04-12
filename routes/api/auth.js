const express = require('express');
const router = express.Router();

// ROUTE        GET api/auth
// DESC         Test Route for authentication
// PERMISSION   Public
router.get('/', (req, res) => res.send('Authentication route'));

module.exports = router;
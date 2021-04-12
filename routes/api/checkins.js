const express = require('express');
const router = express.Router();

// ROUTE        GET api/checkins
// DESC         Test Route for users
// PERMISSION   Public
router.get('/', (req, res) => res.send('Checkins route'));

module.exports = router;
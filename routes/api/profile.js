const express = require('express');
const router = express.Router();

// ROUTE        GET api/profile
// DESC         Test Route for profile
// PERMISSION   Private
router.get('/', (req, res) => res.send('Profile route'));

module.exports = router;
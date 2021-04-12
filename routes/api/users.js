const express = require('express');
const router = express.Router();

// ROUTE        GET api/users
// DESC         Test Route for users
// PERMISSION   Public
router.get('/', (req, res) => res.send('Users route'));

module.exports = router;
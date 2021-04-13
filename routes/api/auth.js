const express = require('express');
const router = express.Router();
// importing auth middleware
const auth = require('../../middle/auth');

const User = require('../../models/User');

// ROUTE        GET api/auth
// DESC         Test Route for authentication
// PERMISSION   Public
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Internal Server Error')
    }
});

module.exports = router;
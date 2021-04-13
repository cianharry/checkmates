const express = require('express');
const router = express.Router();
const auth = require('../../middle/auth');

const Profile = require('../../models/Profile');

// ROUTE        GET api/profile/me
// DESC         Route to get current user profile
// PERMISSION   Private
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate('user',
        ['name', 'avatar']);

        if(!profile) {
            return res.status(400).json({ msg: 'No profile exists for this user' });
        }

        res.json(profile);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error'); 
    }
});

module.exports = router;
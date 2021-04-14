const express = require('express');
const router = express.Router();
const auth = require('../../middle/auth');
const { check, validationResult } = require('express-validator');

const Profile = require('../../models/Profile');

// ROUTE        GET api/profile/me
// DESC         Route to get current user profile
// PERMISSION   Private
// Req_Id:  R02
// Test_Id: T008
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

// ROUTE        POST api/profile
// DESC         Route to create or update a user profile
// PERMISSION   Private
// Req_Id:  R02
// Test_Id: T009
router.post('/',
    [auth,
        // express validator check for minimum age requirement
        [
            check('age', 'Age is a reuired field')
            .not()
            .isEmpty()
            .isInt({ min: 16 })
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        // destructuring the request body
        const {
            age,
            gender,
            bio,
            url,
            youtube,
            instagram,
            facebook,
            twitter
        } = req.body;

        // create Profile object
        const profileFields = {};
        profileFields.user = req.user.id;
        profileFields.age = age;
        if (gender) profileFields.gender = gender;
        if (bio) profileFields.bio = bio;
        if (url) profileFields.url = url;

        // Array for social media links
        profileFields.social = {}
        if (youtube) profileFields.social.youtube = youtube;
        if (instagram) profileFields.social.instagram = instagram;
        if (facebook) profileFields.social.facebook = facebook;
        if (twitter) profileFields.social.twitter = twitter;

        try {
            let profile = await Profile.findOne({ user: req.user.id });
            // If there is a profile then update
            if(profile) {
                profile = await Profile.findOneAndUpdate({ 
                    user: req.user.id },
                    { $set: profileFields },
                    { new: true }
                );
                return res.json(profile);
            }
            // If there is no profile then create and save profile instance
            profile = new Profile(profileFields);
            await profile.save();
            res.json(profile);
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Internal Server error');
        }
    }
);

// ROUTE        GET api/profile
// DESC         Route to get a list of all user profiles
// PERMISSION   Public
// Req_Id:  R02
// Test_Id: T010
router.get('/', async (req, res) => {
    try {
        // getting all profiles and including name and avatar from associated user resource
        const profiles = await Profile.find().populate('user', ['name', 'avatar']);
        res.json(profiles);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
    }
});

// ROUTE        GET api/profile/user/:user_id
// DESC         Route to get a user profile by id
// PERMISSION   Public
// Req_Id:  R02
// Test_Id: T011
router.get('/user/:user_id', async (req, res) => {
    try {
        // getting all profiles and including name and avatar from associated user resource
        const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar']);

        if(!profile) return res.status(400).json({ msg: 'No profile found for the user provided' });

        res.json(profile);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
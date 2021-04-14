const express = require('express');
const router = express.Router();
const auth = require('../../middle/auth');
const { check, validationResult } = require('express-validator');

const Checkin = require('../../models/Checkin');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// ROUTE        POST api/checkins
// DESC         Route to create a new checkin
// PERMISSION   Private
// Req_Id:      R03 - Create Checkin
// Test_Id:     T015
router.post('/',
    [auth,
        [
            check('title', 'Title is a required field')
                .not()
                .isEmpty(),
            check('emotion', 'Emotion is a required field')
                .not()
                .isEmpty(),
            check('intensity', 'intensity is a reuired field')
                .not()
                .isEmpty()
                .isInt({ min: 1, max: 10 }),
            check('maintext', 'Checkin content required')
                .not()
                .isEmpty(),
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            return res.status(400).send({ errors: errors.array() });
        }

        try {
            // get the user account by id
            const user = await (await User.findById(req.user.id)).isSelected('-password');
            // create the checkin from the user model and the request body
            const newCheckin = new Checkin({
                user: req.user.id,
                title: req.body.title,
                emotion: req.body.emotion,
                intensity: req.body.intensity,
                maintext: req.body.maintext,
                name: user.name,
                avatar: user.avatar
            });
            // save the new checkin
            const checkin = await newCheckin.save();
            // send back the checkin
            res.json(checkin);
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Internal Server Error')
        }        
    }
);

// ROUTE        GET api/checkins
// DESC         Test Route for users
// PERMISSION   Public
router.get('/', (req, res) => res.send('Checkins route'));

module.exports = router;
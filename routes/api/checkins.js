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
            const user = await User.findById(req.user.id).select('-password');
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
// DESC         Route to get user checkins
// PERMISSION   Private
// Req_Id:      R03 - Create Checkin
// Test_Id:     T016
router.get('/', auth, async (req, res) => {
    try {
        // getting all checkins and sorting them by most recent date
        const checkins = await Checkin.find().sort({ date: -1 });
        res.json(checkins);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
    }
});

// ROUTE        GET api/checkins/:id
// DESC         Route to get user checkin by id
// PERMISSION   Private
// Req_Id:      R03 - Create Checkin
// Test_Id:     T017
router.get('/:id', auth, async (req, res) => {
    try {
        // getting all checkins and sorting them by most recent date
        const checkin = await Checkin.findById(req.params.id);
        // check if the checkin exists
        if(!checkin) return res.status(404).json({ msg: 'Checkin not found'});
        res.json(checkin);
    } catch (error) {
        console.error(error.message);
        // error response for an invalid checkin ObjectId
        if(error.kind === 'ObjectId') return res.status(404).json({ msg: 'Checkin not found'});
        res.status(500).send('Internal Server Error');
    }
});

// ROUTE        DELETE api/checkins/:id
// DESC         Route to delete a checkin by id
// PERMISSION   Private
// Req_Id:      R03 - Create Checkin
// Test_Id:     T018
router.delete('/:id', auth, async (req, res) => {
    try {
        // getting the checkin by Id
        const checkin = await Checkin.findById(req.params.id);
        // ensuring the checkin exists
        if(!checkin) return res.status(404).json({ msg: 'Checkin not found'});
        // check to see if the current user is the checkin owner
        if(checkin.user.toString() !== req.user.id) {
            return res.status(401).send({ msg: 'User not authorized to complete this action' });
        }
        // delete the checkin 
        await checkin.remove();
        // send back the response
        res.json({ msg: 'Checkin has been permanently deleted'});
    } catch (error) {
        console.error(error.message);
        if(error.kind === 'ObjectId') return res.status(404).json({ msg: 'Checkin not found'});
        res.status(500).send('Internal Server Error');
    }
});

// ROUTE        DELETE api/checkins/reaction/:id
// DESC         Route add a reaction to a checkin
// PERMISSION   Private
// Req_Id:      R03 - Create Checkin
// Test_Id:     T019
router.put('/reaction/:id', auth, async (req, res) => {
    try {
        // getting the checkin using request params Id
        const checkin = await Checkin.findById(req.params.id);
        // ensuring the checkin has not already been reacted to by the current user
        if(checkin.reactions.filter(reaction => reaction.user.toString() === req.user.id).length > 0 ) {
            return res.status(400).json({ msg: 'User can only react to a post once' });
        }
        // add the new reaction (user id) to the reactions array
        checkin.reactions.unshift({ user: req.user.id });
        // save the udated checkin
        await checkin.save();
        // send back the reactions
        res.json(checkin.reactions)
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
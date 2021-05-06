const express = require('express');
const router = express.Router();
const auth = require('../../middle/auth');
const { check, validationResult } = require('express-validator');
// Google Natural Language API client library
const language = require('@google-cloud/language');
// Instantiating the language API client
const client = new language.LanguageServiceClient();
// Importing mongoose model
const Checkin = require('../../models/Checkin');
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
            const document = {
                content: req.body.maintext,
                type: 'PLAIN_TEXT'
            }
            
            // REFERENCE: https://googleapis.dev/nodejs/language/latest/
            // Google Natural Language API call
            const [result] = await client.analyzeSentiment({ document: document });
            const sentimentRes = result.documentSentiment;
            // ReqId:   R0
            // TestId:  T055
            console.log(`Text: ${req.body.maintext}`);
            console.log(`Sentiment score: ${sentimentRes.score}`);
            console.log(`Sentiment magnitude: ${sentimentRes.magnitude}`);
            

            const newCheckin = new Checkin({
                user: req.user.id,
                title: req.body.title,
                emotion: req.body.emotion,
                intensity: req.body.intensity,
                maintext: req.body.maintext,
                sentiment: sentimentRes.score,
                magnitude: sentimentRes.magnitude,
                privacy: req.body.privacy,
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
        //const checkins = await Checkin.find().sort({ date: -1 });
        const checkins = await Checkin.find({ 'privacy': false }).sort({ date: -1 });
        res.json(checkins);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/user', auth, async (req, res) => {
    try {
        // getting all user checkins and sorting them by most recent date
        const checkins = await Checkin.find({ user: req.user.id }).sort({ date: -1 });
        res.json(checkins);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
    }
})


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

// ROUTE        PUT api/checkins/reaction/:id
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

// ROUTE        POST api/checkins/comment/:id
// DESC         Route to add a comment to a checkin
// PERMISSION   Private
// Req_Id:      R03 - Create Checkin
// Test_Id:     T020
router.post('/comment/:id',
    [auth,
        [
            check('text', 'Commments must contain text')
                .not()
                .isEmpty()
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
            // get the checkin specified in the request params
            const checkin = await Checkin.findById(req.params.id);
            // create the checkin from the user model and the request body
            const newComment = {
                user: req.user.id,
                text: req.body.text,
                name: user.name,
                avatar: user.avatar
            };
            // add the comment to the checkin 
            checkin.comments.unshift(newComment);
            // save the updated checkin with comment
            await checkin.save();
            // send back the checkin comments
            res.json(checkin.comments);
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Internal Server Error')
        }        
    }
);

// ROUTE        DELETE api/checkins/comment/:id/comment_id
// DESC         Route to delete a comment from a checkin
// PERMISSION   Private
// Req_Id:      R03 - Create Checkin
// Test_Id:     T021
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
    try {
        // getting the checkin by Id
        const checkin = await Checkin.findById(req.params.id);
        // ensuring the checkin exists
        if(!checkin) return res.status(404).json({ msg: 'Checkin not found'});
        // get the checkin comment using the request params 
        const comment = checkin.comments.find(comment => comment.id === req.params.comment_id);
        // ensuring the comment exists
        if(!comment) return res.status(404).json({ msg: 'Comment not found'});
        // check if the current user owns the comment
        if(comment.user.toString() !== req.user.id) return res.status(401).json({ msg: 'User not authorized to delete this comment'});
        // map the comments to find the index of the comment
        const remove = checkin.comments
            .map(comment => comment.user.toString())
            .indexOf(req.user.id);
            // remove the checkin comment index
            checkin.comments.splice(remove, 1);
            // save the updated checkin
            await checkin.save();
            // send back the updated comments for the checkin
            res.json(checkin.comments);

    } catch (error) {
        console.error(error.message);
        if(error.kind === 'ObjectId') return res.status(404).json({ msg: 'Checkin not found'});
        res.status(500).send('Internal Server Error');
    }
});


module.exports = router;
const express = require('express');
const router = express.Router();
const auth = require('../../middle/auth');
const { check, validationResult } = require('express-validator');

const Chat = require('../../models/Chat');

// ROUTE        POST api/chats
// DESC         Route to create a new chat
// PERMISSION   Private
// Req_Id:      R0
// Test_Id:     T056
router.post('/',
    [auth,
        [
            check('title', 'Title is a required field')
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
            // const user = await User.findById(req.user.id).select('-password');

            const newChat = new Chat({
                title: req.body.title
            })
            // save the new chat
            const chat = await newChat.save();
            // send back the chat
            res.json(chat);
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Internal Server Error')
        }
    }
)

// ROUTE        GET api/chats
// DESC         Route to get user chats
// PERMISSION   Private
// Req_Id:      R0
// Test_Id:     T0
router.get('/', auth, async (req, res) => {
    try {
        // getting all checkins and sorting them by most recent date
        const chats = await Chat.find()
        //const checkins = await Checkin.find({ 'privacy': false }).sort({ date: -1 });
        res.json(chats);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
    }
})

module.exports = router;


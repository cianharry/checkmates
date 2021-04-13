const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
// REFERENCE https://express-validator.github.io/docs/
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

// Unit Testing
// Test_Ids: T003, T004

// Requirements
// Req_Id: R01

// > ROUTE        POST api/users
// > DESC         Registartion route for user
// > PERMISSION   Public
router.post('/', [
    // implementing express router validation constraints on required attributes
    // Test_Id: T004
    check('name', 'Name is a required field')
        .not()
        .isEmpty(),
    check('email', 'Please enter a valid email')
        .isEmail(),
    check(
        'password',
        'Please Enter a password with a minimum of 8 characters'
        ).isLength({ min: 8 })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        // extracting fields from the body
        const { name, email, password } = req.body;

        try {
            // check if user already exists
            let user = await User.findOne({ email });
            if(user) {
                return res.status(400).json({ errors: [{ msg: 'User alreacy exists' }] });
            }
            // Initializing gravatar module and defining size, rating and default image if user does not have a gravatar
            const avatar = gravatar.url(email, {
                s: "200",
                r: 'pg',
                d: 'mm'
            })
            // create user
            user = new User({
                name,
                email,
                avatar,
                password
            });
            // encrypt password
            // generates the salt to be used for hashing - higher number is greater security but longer loading
            const salt = await bcrypt.genSalt(10);

            user.password = await bcrypt.hash(password, salt);

            await user.save();
            // return JWT for immediate login

        res.send('User registration route');

        } catch(err) {
            console.log(err.message);
            res.status(500).send('Sever error');

        }
    }
);
// exporting router module
module.exports = router;
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
// importing auth middleware
const auth = require('../../middle/auth');
// importing User model
const User = require('../../models/User');

// ROUTE        GET api/auth
// DESC         Test Route for authentication
// PERMISSION   Public
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error')
    }
});

// ROUTE        POST api/auth
// DESC         Authenticate user credentials and recieve json web token
// PERMISSION   Public
router.post('/', [
    // Req_Id:  R01
    // Test_Id: 
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Password is a required field').exists()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        // extracting fields from the request body
        const { email, password } = req.body;

        try {
            // check if user email exists
            let user = await User.findOne({ email });
            if(!user) {
                return res.status(400).json({ errors: [{ msg: 'Invalid credentials provided' }] });
            }
            // check if the password provided is valid for the user email
            const isValid = await bcrypt.compare(password, user.password);

            if(!isValid) {
                return res.status(400).json({ errors: [{ msg: 'Invalid credentials provided' }] });
            }

            const payload = {
                user: {
                    id: user.id
                }
            }
            jwt.sign(
                payload,
                config.get('jwtSecret'),
                { expiresIn: 360000 },
                (error, token) => {
                    if(error) throw error;
                    res.json({ token });
                }
            );
        } catch(error) {
            console.log(error.message);
            res.status(500).send('Sever error');
        }
    }
);
// exporting router module
module.exports = router;


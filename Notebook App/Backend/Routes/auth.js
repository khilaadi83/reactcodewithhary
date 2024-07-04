const express = require('express');
const router = express.Router();
const User = require('../Models/users');
const { body, validationResult } = require('express-validator');
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const loginAuth = require('../middleware/LoginAuth');

//Route 1 :  Create a user : Post request which does not requires auth API: /api/auth
// this data will be sent from the thunderclient in body

router.post('/createUser', [
    body('firstname', 'First name is required').notEmpty(),
    body('email', 'Please enter a valid email').isEmail(),
    body('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
    body('phone', 'Phone number is required').notEmpty()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }


    const { firstname, email, password, phone } = req.body;
    try {
        User.findOne({ email: email }).then(user => {
            if (user) {
                return res.status(400).json({ msg: 'Email already exists' })
            }
        })
        const newuser = new User({
            firstname,
            email,
            password,
            phone
        });

        // jwt auth token 
        var jwtToken;
        jwt.sign({ user: newuser }, 'secretykey', (err, token) => {
            jwtToken = token;
        })

        // Hash password before saving in database

        bycrypt.genSalt(10, (err, salt) => {
            bycrypt.hash(newuser.password, salt, (err, hash) => {
                if (err) {
                    throw err;
                } else {
                    newuser.password = hash;
                    // Save the user after hashing the password
                    newuser.save().then(user => {
                        res.json({ mgs: 'done', hash: hash, token: jwtToken })
                    }).catch(err => res.json({ "msg": 'Something went wrong', "error": err }));
                }
            })
        })

        /*  newuser.save().then(user => {
             res.json({ mgs: 'done' })
         }).catch(err => res.json({ "msg": 'Something went wrong', "error": err })); */
    }
    catch (err) {
        res.status(500).json({ msg: 'Server error', error: err.message });
    }

    console.log('User Saved successfully')
});

// Route 2 for Login
router.post('/login', [

    body('email', 'Please enter a valid email').isEmail(),
    body('password', 'Password must be at least 6 characters').exists()

], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        User.findOne({ email: email }).then(user => {
            if (!user) {
                return res.status(400).json({ msg: 'No such User Exist !!' })
            }
            bycrypt.compare(password, user.password).then(isMatch => {
                if (isMatch) {
                    jwt.sign({ user: user }, 'secretykey', (err, token) => {
                        if (err) throw err;
                        res.json({ msg: 'Login Successfull', token: token })
                    })
                } else {
                    return res.status(400).json({ msg: 'Email or Password in incorrect !!' })
                }
            })
        })


    } catch (e) {
        res.json({ msg: 'Something went wrong', error: e.message })
    }
})


// Route 3 for get user details
router.post('/getUser', loginAuth.verifyToken, (req, res) => {
    console.log("we got request.token", req.token)
    try {
        jwt.verify(req.token, 'secretykey', (err, authData) => {
            if (err) {
                res.json({
                    ERROR: "Some Error"
                })
            } else {
                res.json({
                    success: 'login Success',
                   userInfo: authData.user
                })
            }
        })
    }
    catch (e) {
        res.json({
            ERROR: "Some Error"
        })
    }




})
module.exports = router;
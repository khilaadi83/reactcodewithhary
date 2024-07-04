const express = require('express');
const router = express.Router();
const loginAuth = require('../middleware/LoginAuth');
const Notes = require('../Models/notes');
const jwt = require('jsonwebtoken');

// Get Notes for logged in users
router.get('/fetchallNotes', loginAuth.verifyToken, (req, res) => {
    try {
        jwt.verify(req.token, 'secretykey', (err, authData) => {
            if (err) {
                return res.status(403).json({ msg: 'Token is not valid', error: err.message });
            }

            Notes.find({ user: authData.user._id })
                .then(notes => {
                    res.json(notes);
                    return; // Add this line to exit the function
                })
                .catch(err => {
                    return res.status(500).json({ msg: 'Error in fetching notes', error: err.message });
                });
        });
    } catch (err) {
        return res.status(500).json({ msg: 'An error occurred', error: err.message });
    }
});

module.exports = router;

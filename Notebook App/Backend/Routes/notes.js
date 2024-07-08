const express = require('express');
const router = express.Router();
const loginAuth = require('../middleware/LoginAuth');
const Notes = require('../Models/notes');
const jwt = require('jsonwebtoken');
const User = require('../Models/users');
const { body, validationResult } = require('express-validator');
//Route 1 Get Notes for logged in users
router.get('/fetchallNotes', loginAuth.verifyToken, async (req, res) => {
    console.log("Hit fetchallNotes endPoint");
    try {
        console.log(req.authData)
        const notes = await Notes.find({ user: req.authData.user._id });
        res.json(notes);
    }
    catch (e) {
        console.log('some error occured', e);
    }
});

// Route 2 Add notes for logged in users
router.post('/addNote', loginAuth.verifyToken, [
    body('title', 'Minimum 6 Character Required').isLength({ min: 6 }),
    body('description', 'Minimum 10 Character Required').isLength({ min: 10 }),
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        console.log("Hit addNote endPoint");
        const { title, description } = req.body;
        const newNote = new Notes({
            title,
            description,
            user: req.authData.user._id
        });

        const savedNote = await newNote.save();
        res.json({ msg: 'Note Added Successfully', note: savedNote });
    } catch (e) {
        res.status(500).json({ msg: 'Internal Server Error', error: e.message });
    }
});

// Route 3- To update Notes for logged in users
router.post('/updateNotes/:id', body('title', 'Minimum 6 Character Required').isLength({ min: 6 }),
    body('description', 'Minimum 10 Character Required').isLength({ min: 10 }), loginAuth.verifyToken, async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        } try {
            const { title, description } = req.body;
            var newNote = {};
            if (title ? newNote.title = title : null);
            if (description ? newNote.description = description : null);
            var note = await Notes.findByIdAndUpdate(req.params.id);
            if (!note) {
                return res.status(404).json({ msg: 'Note not found' });
            }
            if (note.user.toString() !== req.authData.user._id.toString()) {
                return res.status(401).json({ msg: 'Not Authorized to Update this Note' });
            }
            note = await Notes.findByIdAndUpdate(req.params.id, newNote, { new: true });
            res.json({ msg: 'Note Updated Successfully', note: note });
        } catch (e) {
            res.status(500).json({ msg: 'Something Went Wrong While Updating the Note', error: e.message });
        }
    })

// Route 4: Delete a node based on the id
router.post('/deleteNote/:id', loginAuth.verifyToken, async (req, res) => {
    try {
        var note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).json({ msg: 'Note not found' });
        }
        if (note.user.toString() !== req.authData.user._id.toString()) {
            return res.status(401).json({ msg: 'Not Authorized to Update this Note' });
        }

        var deletedNote = await Notes.findByIdAndDelete(req.params.id);

        res.json({ msg: 'Note Deleted Successfully', note: deletedNote });

    } catch (e) {
        res.status(500).json({ msg: 'Something Went Wrong While Deleting the Note', error: e.message });
    }

})

module.exports = router;

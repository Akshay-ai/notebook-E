const express = require('express');
const router  = express.Router();
const fetchUser = require('../middleware/fetchdata');
const Notes = require('../models/Notes');
const {body, validationResult} = require('express-validator');

router.get('/fetchallnotes', fetchUser, async (req, res)=>{
    try {
        const notes = await Notes.find({user : req.user.id});
        res.json(notes);        
    } catch(error){
        console.error(error.message);
        res.status(500).send("Some error Occured")
    }
    
});

router.post('/addnote', fetchUser, [
    body('title', 'Enter a valid title').isLength({min : 3}),
    body('description', 'Description should be atleast 5 characters').isLength({min : 5})
], async (req, res) => {
    try {
        const {title, tag, description} = req.body;
        const err = validationResult(req);
        if(!err.isEmpty()) {
            res.status(400).send({errors : err.array()});
        }
        const note = new Notes({
            title, description, tag, user : req.user.id
        });
        const savedNote = await note.save();
        res.send(savedNote);        
    } catch(error){
        console.error(error.message);
        res.status(500).send("Some error Occured")
    }
});

router.put('/updatenote/:id', fetchUser, async (req, res) => {
    try {
        const {title, description, tag, color, check} = req.body;

        const newNote = {};
        if(title) newNote.title = title;
        if(description) newNote.description =description;
        if(tag) newNote.tag = tag;
        if(color) newNote.color = color;
        if(color) newNote.check = check;

        let note = await Notes.findById(req.params.id);
        if(!note) return res.status(404).send("Note not Found");

        if(note.user.toString() !== req.user.id) 
            return res.status(401).send("Not Allowed");
        
        note = await Notes.findByIdAndUpdate(req.params.id,
            {$set : newNote}, {new:true})
        res.send(note)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error Occured")       
    }
});

router.delete('/deletenote/:id', fetchUser, async (req, res) => {
    try {
        let note = await Notes.findById(req.params.id);
        if(!note) return res.status(404).send("Note not Found");

        if(note.user.toString() !== req.user.id) 
            return res.status(401).send("Not Allowed");
        
        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({note});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error Occured")       
    }
});

module.exports = router;
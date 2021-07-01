const express = require('express')
const router = express.Router()
const Note = require("../models/note.model")
const { extend } = require("lodash");

router.route("/")
.get(async(req,res)=> {
  try{
  let notes = await Note.find({})
  notes = notes.filter((note) => note.active);
  res.status(200).json({success:true,notes})

  } catch(error){
        res.status(400).json({success:false, message: "Request failed please check errorMessage key for more details", errorMessage: error.message })
    }
})
.post(async(req,res)=> {
  try{
    const {user} = req;
    const {title,note,tag,color} =req.body;
    let newNote = new Note({title:title,note:note,tag:tag,color:color})
    newNote.userId = user._id;
    newNote.active = true;
    newNote = await newNote.save();
    res.status(200).json({success:true,newNote})

  }catch(error){
        res.status(400).json({success:false, message: "Request failed please check errorMessage key for more details", errorMessage: error.message })
    }
})
.put(async(req,res)=> {
  try{ 
  const {noteId} = req.body;
  console.log("39",noteId)
  let note = await Note.findOne({_id:noteId})
  console.log(note)
  note.active = false;
  note = await note.save();
  res.status(200).json({success:true,note})

  }catch(error){
    console.log(error)
        res.status(400).json({success:false, message: "Request failed please check errorMessage key for more details", errorMessage: error.message })
    }
})


// for update note 
router.route("/editnote/:noteId")
.post(async(req,res)=> {
  try{
    const {noteId} = req.params;
    const updateData = req.body;
    console.log(noteId)
    console.log(updateData)
    let note = await Note.findOne({_id:noteId});
    console.log(note)
    note = extend(note,updateData)
    await note.save();

    res.status(200).json({success:true,note})
  }catch(error){
    console.log(error)
        res.status(400).json({success:false, message: "Request failed please check errorMessage key for more details", errorMessage: error.message })
    }
})



module.exports = router;
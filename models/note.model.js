const mongoose = require('mongoose');
const { Schema } = mongoose;


const noteSchema = new Schema({
  userId:{
    type:Schema.Types.ObjectId,
    ref:'User'
  },
  title:{
    type:String,
    
  },
  note:{
    type:String
  },
  tag:{
    type:String,
    default:'note'
  },
  color:{
    type:String,
    default:'white'
  },
  active:Boolean
})



const Note = new mongoose.model("Note",noteSchema);

module.exports = Note
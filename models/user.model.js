const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema  = new Schema({
   userId:{
    type:Schema.Types.ObjectId,
  },
  username:{
    type:String,
    required:"username is require !",
    unique:true,
  },
  email:{
    type:String,
    required:"email is require !"
  },
  password:{
    type:String,
    required:"password is require !"
  }
})


const User = mongoose.model("User",userSchema);

module.exports = User;
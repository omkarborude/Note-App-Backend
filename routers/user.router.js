const User = require("../models/user.model");
const express = require("express");
const router = express.Router();
const authMiddle = require("../middlewares/auth")
const { extend } = require("lodash");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mySecret = process.env['jwt-secret']


router.route("/login")
.post(async(req,res)=> {
  try{   

    const {username,password} = req.body;
    let user = await User.findOne({username:username})

    if(user) {
      if(bcrypt.compareSync(password,user.password)){
             const token = jwt.sign({_id:user._id,username:user.username,email:user.email},mySecret,{expiresIn:'24h'})
          
          res.status(200).json({success:true,token})

      } else{
         res.json({success:false,message:"Password is Incorrect!"})
      }
    } else{
      res.json({success:false,message:"username is Incorrect!"})
    }
  
   

  }catch(error){
       console.log(error)
        res.status(400).json({success:false, message: "Request failed please check errorMessage key for more details", errorMessage: error.message })
    }
})

router.route("/signup")
.post(async(req,res)=> {
  try{
   let newUserData = req.body;
   const usernameAlreadyExist = await User.exists({username:newUserData.username})
   if(usernameAlreadyExist){
     res.json({success:false,message:"username Already Exist !"})
   }
   newUserData.password = bcrypt.hashSync(newUserData.password,10)
   let newUserDb = new User(newUserData)
   newUserDb = await newUserDb.save()
   await res.status(200).json({ success: true, message: "Successfully signUp !" });
  }catch(error){
        res.status(400).json({success:false, message: "Request failed please check errorMessage key for more details", errorMessage: error.message })
    }
})


module.exports = router;
const mongoose = require('mongoose')

const initializeConnectionDb = async() => {
  await mongoose.connect(`mongodb+srv://omkar:omkar@8354@cluster0.s0ts1.mongodb.net/test`, {useNewUrlParser: true, useUnifiedTopology: true})
    console.log("db connected"); 
}


module.exports = initializeConnectionDb;
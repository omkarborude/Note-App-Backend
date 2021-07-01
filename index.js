const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors');
const user = require("./routers/user.router")
const note = require("./routers/note.router")
const authMiddle = require("./middlewares/auth")
const initializeConnectionDb = require("./DB/db.connect");

const app = express();

app.use(bodyParser.json())
app.use(cors());  

const port = 3000;

initializeConnectionDb();

app.get('/', (req, res) => {
  res.send('Hello Express app!')
});

app.use("/user",user);
app.use("/note",authMiddle,note);

app.listen( process.env.PORT || port, () => {
    console.log(`server Online!`)
  })
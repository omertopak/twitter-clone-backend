"use strict";

const express = require("express");
const cors = require('cors');
const app = express();
// MULTER -------
const multer  = require('multer')
// multer storage confiq
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage })
// -----------------
require("dotenv").config();

app.use(cors())

const PORT = process.env.PORT || 8000;
//error handler
require('express-async-errors')
/* ------------------------------------------------------- */
//!---------------------------------AC
require('./src/configs/dbConnection')
/* ------------------------------------------------------- */
app.use(express.json())

// MULTER
app.post('/api/upload',upload.single('file'),(req,res)=>{
  res.json(req.file);
  // res.send('done')
})


app.use(require('./src/middlewares/authentication'))

app.get('/', function (req, res) {
    res.send(' --TWITTER API--'); // This will serve your request to '/'.
  });

  /* ------------------------------------------------------- */

// Routes:
// app.use(require('./src/routes'))
app.use('/auth', require('./src/routes/auth'))
app.use('/tweets', require('./src/routes/tweet'))
app.use('/user', require('./src/routes/user'))

/* ------------------------------------------------------- */
app.use(require('./src/middlewares/errorHandler'))
/* ------------------------------------------------------- */
app.listen(PORT, () => console.log('http://127.0.0.1:' + PORT))
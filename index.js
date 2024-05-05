"use strict";

const express = require("express");
const app = express();

require("dotenv").config();


const PORT = process.env.PORT || 8000;
//error handler
require('express-async-errors')
/* ------------------------------------------------------- */
//!---------------------------------AC
require('./src/configs/dbConnection')
/* ------------------------------------------------------- */
app.use(express.json())


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
app.use('/notif', require('./src/routes/notification'))

/* ------------------------------------------------------- */
app.use(require('./src/middlewares/errorHandler'))
/* ------------------------------------------------------- */
app.listen(PORT, () => console.log('http://127.0.0.1:' + PORT))
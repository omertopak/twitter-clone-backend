"use strict";
/* -------------------------------------------------------
    EXPRESSJS - TODO Project with Sequelize
------------------------------------------------------- */

const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 8000;
//error handler
require('express-async-errors')
/* ------------------------------------------------------- */
//DB Connection .
//! LOCAL'de calisiyoruz. en son bagla!!!!
// const { dbConnection } = require('./src/configs/dbConnection')
// dbConnection()

/* ------------------------------------------------------- */
app.use(express.json())
// Check Authentication:  
//! req.user datasini yolladik
app.use(require('./src/middlewares/authentication'))

/* ------------------------------------------------------- */
// Routes:
// app.use(require('./src/routes'))
app.use('/users/auth', require('./src/routes/auth'))
app.use('/tweets', require('./src/routes/tweet'))
app.use('/user', require('./src/routes/user'))

/* ------------------------------------------------------- */
app.use(require('./src/middlewares/errorHandler'))
/* ------------------------------------------------------- */
app.listen(PORT, () => console.log("Running: http://127.0.0.1:" + PORT));
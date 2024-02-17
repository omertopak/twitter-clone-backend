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
//DB Connection 
//! LOCAL'de calisiyoruz. en son bagla!!!!
// const { dbConnection } = require('./src/configs/dbConnection')
// dbConnection()

/* ------------------------------------------------------- */
app.use(express.json())


/* ------------------------------------------------------- */

app.use(require('./src/middlewares/errorHandler'))
/* ------------------------------------------------------- */
app.listen(PORT, () => console.log("Running: http://127.0.0.1:" + PORT));
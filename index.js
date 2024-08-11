"use strict";
const express = require("express");
const cors = require('cors');
const app = express();

require("dotenv").config();
app.use(cors());


const PORT = process.env.PORT || 8000;

require('express-async-errors');
require('./src/configs/dbConnection');
app.use(express.json());
app.use(require('./src/middlewares/authentication'));

app.get('/', function (req, res) {
  res.send(' --TWITTER API--');
});

app.use('/auth', require('./src/routes/auth'));
app.use('/tweets', require('./src/routes/tweet'));
app.use('/user', require('./src/routes/user'));


app.use(require('./src/middlewares/errorHandler'));

app.listen(PORT, () => console.log('http://127.0.0.1:' + PORT));

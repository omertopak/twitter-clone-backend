"use strict";
const express = require("express");
const cors = require('cors');
const app = express();
const User = require("./src/models/user");
const upload = require("./src/middlewares/multer");

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

app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    console.log('Request body:', req.body);
    console.log('Uploaded file:', req.file);

    const { username, first_name, last_name, email, password } = req.body;
    const image = req.file ? req.file.path : null; 

    const newUser = new User({
      username,
      first_name,
      last_name,
      email,
      password,
      image,
    });
    console.log(newUser);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).send('Error registering user.');
  }
});


app.use(require('./src/middlewares/errorHandler'));

app.listen(PORT, () => console.log('http://127.0.0.1:' + PORT));

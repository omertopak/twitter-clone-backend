"use strict";
const express = require("express");
const cors = require('cors');
const path = require('path'); // path modülünü ekledik
const app = express();

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

require("dotenv").config();
app.use(cors());
// const allowedOrigins = ['http://localhost:3000', 'https://twitter-clone-iv4y.onrender.com'];
// app.use(cors({
//     origin: (origin, callback) => {
//         if (!origin || allowedOrigins.includes(origin)) {
//             callback(null, true);
//         } else {
//             callback(new Error('CORS policy does not allow access from this origin'));
//         }
//     }
// }));


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

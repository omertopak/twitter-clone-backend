"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const router = require('express').Router()
/* ------------------------------------------------------- */
// routes/auth:

const notification = require('../controllers/notification')

// URL: /auth

router.post('/', notification.create) 

/* ------------------------------------------------------- */
module.exports = router
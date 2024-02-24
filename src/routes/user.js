"use strict"

const router = require('express').Router()

// Call Controllers:
const { User } = require('../controllers/user')

//PERMISSION LIST ADMIN
router.route('/')
    .get(User.list)
router.post('/register', User.create) 
router.route('/:userId')
    .get(User.read)
    .put(User.update)
    .delete(User.delete)

module.exports = router
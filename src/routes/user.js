"use strict"

const router = require('express').Router()

// Call Controllers:
const { User } = require('../controllers/user')

//PERMISSION LIST ADMIN
router.route('/') //admin
    .get(User.list)
router.post('/register', User.create) 
router.route('/:userId')
    .get(User.read) //herkes
    .put(User.update) //user
    .delete(User.delete) //user

module.exports = router
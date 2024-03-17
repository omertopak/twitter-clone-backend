"use strict"

const router = require('express').Router()

// Call Controllers:
const { User } = require('../controllers/user')


router.route('/') //admin
    .get(User.list)
    // .get((req,res)=>res.send("get"))
router.route('/register')
    .post(User.create) 
router.route('/:userId')
    .get(User.read) //herkes
    .put(User.update) //user
    .delete(User.delete) //user
router.route('/:userId/follow')
    .post(User.follow)


module.exports = router
"use strict"

const router = require('express').Router()

// Call Controllers:
const { Tweet } = require('../controllers/tweet')
// ------------------------------------------
// Tweet
// ------------------------------------------
router.route('/')
    .get(Tweet.list) //sadece admin yapar
    .post(Tweet.create)
router.route('/timeline') //kullanici timeline main
    .get(Tweet.followingTweets)
router.route('/timeline2') //kullanici for you
    .get(Tweet.anyUserTweets)
router.route('/user/:userId')
    .get(Tweet.listUser)
router.route('/:tweetId')
    .get(Tweet.read)
    .post(Tweet.createReply)
    .put(Tweet.createRepost)
    .delete(Tweet.delete) //sadece twit sahibi yapar
router.route('/:tweetId/like')    
    .put(Tweet.fav)
router.route('/:tweetId/bookmark')    
    .put(Tweet.bookmark)



module.exports = router
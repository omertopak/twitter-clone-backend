"use strict"

const router = require('express').Router()

// Call Controllers:
const { Tweet } = require('../controllers/tweet')
// ------------------------------------------
// Tweet
// ------------------------------------------
router.route('/')
    .get(Tweet.list)
    .post(Tweet.create)
router.route('/:userId')
    .get(Tweet.anyUserTweets)
router.route('/home')
    .get(Tweet.followingTweets)
router.route('/:tweetId')
    .get(Tweet.read)
    .put(Tweet.createReply)
    .update(Tweet.createRepost)
router.route('/like/:tweetId')    
    .put(Tweet.fav)


router.put('/pushComments/:tweetId')
router.put('/pullComments/:tweetId')
router.put('/likes/:tweetId')

// ------------------------------------------
// TweetPost
// ------------------------------------------
// router.route('/post')
//     .get(TweetPost.list)
//     .post(TweetPost.create)

// router.route('/post/:postId')
//     .get(TweetPost.read)
//     .put(TweetPost.update)
//     .delete(TweetPost.delete)

// router.get('/category/:categoryId/posts', TweetPost.listCategoryPosts)

module.exports = router
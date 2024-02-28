"use strict"

const Tweet = require('../models/tweet')

module.exports.Tweet = {

    list: async (req, res) => {

        const data = await Tweet.find()

        res.status(200).send({
            error: false,
            count: data.length,
            result: data
        })
    },

    myTweets: async (req, res) => {
        
        const userId = req.user._id
        const data = await Tweet.find({ user: userId }).sort({
            createAt: -1,
          });
        
        res.status(200).send({
            error: false,
            count: data.length,
            result: data
        })
    },

    followingTweets:async (req, res) => {
        const userData = req.user
        const followersTweets = await Promise.all(
          userData.following.map((followerId) => {
            return Tweet.find({ userId: followerId });
          })
        );

        res.status(200).send({
            error: false,
            count: data.length,
            result: followersTweets
        })
    },
    
    create: async (req, res) => {
        const tweet = req.body
        tweet.user = req.user._id 
        const data = await Tweet.create(tweet)
        

        res.status(201).send({
        error: false,
        body: req.body,
        result: data,
        })
        
        
    },

    createReply: async (req, res) => {
        const tweetId = req.param.tweetId
        const reply = req.body
        reply.repliedTo = tweetId
        reply.user = req.user._id 
        const replyTweet = await Tweet.create(reply)

        const repPushed = await Tweet.updateOne({ _id: tweetId }, { $push: { replies: replyTweet._id } }) 

        const newTweet = await Tweet.findOne({ _id: tweetId }).populate('tweet')

        res.status(201).send({
        error: false,
        body: reply,
        result: newTweet,
        })
        
        
    },

    read: async (req, res) => {

        // req.params.tweetId
        // const data = await Tweet.findById(req.params.tweetId)
        const data = await Tweet.findOne({ _id: req.params.tweetId })

        res.status(200).send({
            error: false,
            result: data
        })

    },
    
    //update yok
    update: async (req, res) => {
        
        // const data = await Tweet.findByIdAndUpdate(req.params.tweetId, req.body, { new: true }) // return new-data
        await Tweet.updateOne({ _id: req.params.tweetId }, req.body, { runValidators: true })
        const data = await Tweet.findOne({ _id: req.params.tweetId })

        res.status(202).send({
            error: false,
            result: data, 
        })

    },

    delete: async (req, res) => {
        
        const data = await Tweet.deleteOne({ _id: req.params.tweetId })

        res.sendStatus( (data.deletedCount >= 1) ? 204 : 404 ).send({
            error:!data.deletedCount,
            data
        })

    },
}
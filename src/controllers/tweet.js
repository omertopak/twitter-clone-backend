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

    create: async (req, res) => {
        const tweet = req.body
        tweet.user = req.user._id 
        const data = await Tweet.create(tweet)
        

        res.status(201).send({
        error: false,
        result: data,
        })
        
        
    },

    anyUserTweets: async (req, res) => {
        
        const userId = req.params.userId
        const data = await Tweet.find({$and: [{user: userId},{reposted_by:userId}] }).sort({
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
          userData.following.map((followingId) => {
            return Tweet.find({ $and: 
                [{user: followingId},
                {reposted_by:followingId}] })
                .sort({
                    createAt: -1,
                  });
          })
        );

        res.status(200).send({
            error: false,
            count: data.length,
            result: followersTweets
        })
    },
    
    

    createReply: async (req, res) => {
        const tweetId = req.param.tweetId
        const reply = req.body
        reply.repliedTo = tweetId
        reply.user = req.user._id 
        const replyTweet = await Tweet.create(reply)

        await Tweet.updateOne({ _id: tweetId }, { $push: { replies: replyTweet._id } }) 

        const newTweet = await Tweet.findOne({ _id: tweetId }).populate('tweet')

        res.status(201).send({
        error: false,
        result: newTweet,
        })
    },

    createRepost: async (req, res) => {
        let message = ""
        const user_id = req.user._id
        const tweetId = req.param.tweetId
        const check = await Tweet.findOne({_id: tweetId, reposted_by :user_id})
        
        if(check){
            await Tweet.updateOne({ _id: tweetId },{ $pull: { reposted_by: user_id} })
            message = "you undo your retweet."
        }else{
            await Tweet.updateOne({ _id: tweetId },{ $push: { reposted_by: user_id} })
            message = "you retweeted."
        }

        const result = await Blog.findOne({ _id: tweetId })
        
        res.status(202).send({
            error: false,
            message:message,
            result: result,
            
        })
    },

    read: async (req, res) => {

        const user_id = req.user._id

        await Tweet.updateOne({ _id: req.params.tweetId },{ $addToSet: { tweet_viewers: user_id} })
        
        const data = await Tweet.findOne({ _id: req.params.tweetId })
        
        res.status(200).send({
            error: false,
            result: data
        })

    },

    fav : async (req, res) => {
        let message = ""
        const user_id = req.user?._id
        const tweet_id = req.params?.tweetId
        const check = await Tweet.findOne({_id: tweet_id, favorites :user_id})
        
        if(check){
            await Tweet.Blog.updateOne({ _id: tweet_id }, { $pull: { favorites: user_id } })
            message = "you disliked a post"
        }else{
            await Tweet.Blog.updateOne({ _id: tweet_id }, { $push: { favorites: user_id } })
            message = "you liked a post"
        }
        
        const result = await Blog.findOne({ _id: tweet_id })
        res.status(202).send({
            error: false,
            message:message,
            result: result,
            
        })
    },
    //
    //update yok
    // update: async (req, res) => {
        
    //     // const data = await Tweet.findByIdAndUpdate(req.params.tweetId, req.body, { new: true }) // return new-data
    //     await Tweet.updateOne({ _id: req.params.tweetId }, req.body, { runValidators: true })
    //     const data = await Tweet.findOne({ _id: req.params.tweetId })

    //     res.status(202).send({
    //         error: false,
    //         result: data, 
    //     })

    // },

    delete: async (req, res) => {
        
        const data = await Tweet.deleteOne({ _id: req.params.tweetId })

        res.sendStatus( (data.deletedCount >= 1) ? 204 : 404 ).send({
            error:!data.deletedCount,
            result:data
        })

    },
}
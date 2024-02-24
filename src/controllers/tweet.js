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

    // FollowerTweets: async (req, res) => {

    //     const data = await Tweet.find()

    //     res.status(200).send({
    //         error: false,
    //         count: data.length,
    //         result: data
    //     })
    // },
    
    create: async (req, res) => {

        const data = await Tweet.create(req.body)
       

        res.status(201).send({
        error: false,
        body: req.body,
        result: data,
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
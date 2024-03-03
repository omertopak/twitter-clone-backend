"use strict"

const User = require('../models/user')

module.exports.User = {

    list: async (req, res) => {

        const data = await User.find()

        res.status(200).send({
            error: false,
            count: data.length,
            result: data
        })
    },
    
    create: async (req, res) => {

        const data = await User.create(req.body)
       

        res.status(201).send({
        error: false,
        body: req.body,
        result: data,
        })
        
        
    },

    read: async (req, res) => {

        const userId = req.params.userId
        // const data = await User.findById(req.params.userId)
        const data = await User.findOne({ _id: userId })

        res.status(200).send({
            error: false,
            result: data
        })

    },

    update: async (req, res) => {
        
        // const data = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true }) // return new-data
        await User.updateOne({ _id: req.params.userId }, req.body, { runValidators: true })
        const data = await User.findOne({ _id: req.params.userId })

        res.status(202).send({
            error: false,
            result: data, 
        })

    },

    delete: async (req, res) => {
        
        const data = await User.deleteOne({ _id: req.params.userId })

        res.sendStatus( (data.deletedCount >= 1) ? 204 : 404 ).send({
            error:!data.deletedCount,
            data
        })

    },
    //follow-unfollow
    follow: async (req, res) => {
        //user
        const user = req.params.userId
        //currentUser
        const currentUser = req.user._id
        let message = ''
        if (!user.followers.includes(currentUser)) {
            await user.updateOne({
              $push: { followers: currentUser },
            });
            await currentUser.updateOne({ $push: { following: user } });
            message = `you followed ${user.username}`
          } else {
            await user.updateOne({
                $pull: { followers: currentUser },
              });
              await currentUser.updateOne({ $pull: { following: user } });
              message = `you unfollowed ${user.username}`
          }
          
          res.status(202).send({
            error: false,
            result: message, 
        })

    },

    
}
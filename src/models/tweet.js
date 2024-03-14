"use strict"


// const { mongoose } = require('../configs/dbConnection')
const mongoose = require('mongoose')
const TweetSchema = new mongoose.Schema({

    tweet: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },

    image: { // change URL to mongoMedia ..
        type: String,
        trim: true
    },
    
    //done
    user: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    // done
    repliedTo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Tweet"
    },
    //done
    replies:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Tweet"
        }],
    //done
    reply_count:{
        type: Number,
        default: function () {
            return this.replies.length
        }
    },


    reposted_by:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
    ],

    repost_count:{
        type: Number,
        default:function () {
            return this.reposted_by.length;
        },
    },

    //done
    tweet_viewers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
    //done
    tweet_view_count:{
        type:Number,
        default:function () {
            return this.tweet_viewers.length;
        },
    },

    

    favorites:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],

    favorite_count:{
        type: Number,
        default: function () {
            return this.favorites.length
        }
    },


}, { collection: 'tweet', timestamps: true })


/* ------------------------------------------------------- */
module.exports = mongoose.model('Tweet', TweetSchema)
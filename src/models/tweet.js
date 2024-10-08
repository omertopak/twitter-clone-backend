"use strict"


// const { mongoose } = require('../configs/dbConnection')
const mongoose = require('mongoose')
const TweetSchema = new mongoose.Schema({

    tweet: {
        type: String,
        trim: true,
        required: true,
        unique:false
    },

    images: {
        type: [String], // Bu alan bir dizi olup, her eleman String olmalıdır
        validate: [arrayLimit, '{PATH} exceeds the limit of 4']
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
        type:Number,
        default:0
    },


    reposted_by:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
    ],

    repost_count:{
        type: Number,
        default:0
    },

    //done
    tweet_viewers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
    //done
    tweet_view_count:{
        type:Number,
        default:0
    },
    
    favorites:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],

    favorite_count:{
        type: Number,
        default:0
    },
    
    bookmarks:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],

    bookmark_count:{
        type: Number,
        default:0
    },


}, { collection: 'tweet', timestamps: true })

function arrayLimit(val) {
    return val.length <= 4;
  }

  TweetSchema.pre('save', function(next) {
    this.reply_count = this.replies.length;
    this.repost_count = this.reposted_by.length;
    this.tweet_view_count = this.tweet_viewers.length;
    this.favorite_count = this.favorites.length;
    next();
});
   

/* ------------------------------------------------------- */
module.exports = mongoose.model('Tweet', TweetSchema)
"use strict"


const { mongoose } = require('../configs/dbConnection')

const TweetSchema = new mongoose.Schema({

    tweet: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },

    image: { // cahange URL to mongoMedia 
        type: String,
        trim: true
    },
    
    
    user: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    //alinti
    quote_count:{
        type: Number,
        default:0,
    },

    repliedTo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Tweet"
    },

    replies:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Tweet"
        }],

    reply_count:{
        type: Number,
        default: function () {
            return this.replies.length
        }
    },
    
    tweet_viewers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],

    tweet_view_count:{
        type:Number,
        default:function () {
            return this.tweet_viewers.length;
        },
    },

    retweet_count:{
        type: Number,
        default:0,
    },

    favorites:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    favorite_count:{
        type: Number,
        default: function () {
            return this.favorites.length
        }
    },


}, { collection: 'tweet', timestamps: true })


/* ------------------------------------------------------- */
module.exports = mongoose.model('Tweet', TweetSchema)
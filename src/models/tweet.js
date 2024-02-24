"use strict"


const { mongoose } = require('../configs/dbConnection')

const TweetSchema = new mongoose.Schema({

    description: {
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
    },

    reply_count:{
        type: Number,
    },
    
    retweet_count:{
        type: Number,
    },
    
    favorite_count:{
        type: Number,
    },

    entities: {
        hashtags:{
            type: String,
            trim: true,
        },
        user_mentions:{
            type: String,
            trim: true,
        },
    },

    replies:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Tweet"
    }],

    
    
       

}, { collection: 'tweet', timestamps: true })


/* ------------------------------------------------------- */
module.exports = mongoose.model('Tweet', TweetSchema)
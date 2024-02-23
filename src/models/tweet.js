"use strict"


const { mongoose } = require('../configs/dbConnection')

const TweetSchema = new mongoose.Schema({

    text: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },

    image: { // URL
        type: String,
        trim: true
    },
    
    
    user: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    //alinti
    quote_count:{},

    reply_count:{},
    
    retweet_count:{},
    
    favorite_count:{},

    entities: {
        hashtags:{},

        urls:{},

        user_mentions:{},
    },

    replies:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Tweet"
    }]
       

}, { collection: 'tweet', timestamps: true })

/* ------------------------------------------------------- */
// FOR REACT PROJECT:
TweetSchema.pre('init', function(data) {
    data.id = data._id
    data.createds = data.createdAt.toLocaleDateString('tr-tr')
})
/* ------------------------------------------------------- */
module.exports = mongoose.model('Tweet', TweetSchema)
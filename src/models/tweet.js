"use strict"


const { mongoose } = require('../configs/dbConnection')

const TweetSchema = new mongoose.Schema({

    name: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },

    image: { // URL
        type: String,
        trim: true
    },
    
    created_at: {
        
    },
    text: {
        
    },
    user: {
        
    },
    
    entities: {
        quoted_status_id:{},
        quoted_status_id_str:{},
        is_quote_status:{},
        quote_count:{},
        reply_count:{},
        retweet_count:{},
        favorite_count:{},
        entities:{},
        extended_entities:{
            "media":[]
        },
        favorited:{},
        retweeted:{}
    },
       

}, { collection: 'tweet', timestamps: true })

/* ------------------------------------------------------- */
// FOR REACT PROJECT:
TweetSchema.pre('init', function(data) {
    data.id = data._id
    data.createds = data.createdAt.toLocaleDateString('tr-tr')
})
/* ------------------------------------------------------- */
module.exports = mongoose.model('Tweet', TweetSchema)
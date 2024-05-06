"use strict"

const mongoose = require('mongoose');

const TweetSchema = new mongoose.Schema({
    tweet: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    image: {
        type: String,
        trim: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    repliedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tweet"
    },
    replies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tweet"
    }],
    reposted_by: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    tweet_viewers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    favorites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]
}, { collection: 'tweet', timestamps: true });

// Virtuals
TweetSchema.virtual('reply_count').get(function() {
    return this.replies.length;
});

TweetSchema.virtual('repost_count').get(function() {
    return this.reposted_by.length;
});

TweetSchema.virtual('tweet_view_count').get(function() {
    return this.tweet_viewers.length;
});

TweetSchema.virtual('favorite_count').get(function() {
    return this.favorites.length;
});

module.exports = mongoose.model('Tweet', TweetSchema);

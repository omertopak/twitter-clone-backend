"use strict"

// const { mongoose } = require('../configs/dbConnection')
const mongoose = require('mongoose')
const passwordEncrypt = require('../helpers/passwordEncrypt')

const UserSchema = new mongoose.Schema({

    first_name: {
        type: String,
        trim: true,
        required: true,
    },
    last_name: {
        type: String,
        trim: true,
        required: true,
    },

    username:{ 
        type: String,
        trim: true,
        required: true,
        unique: true
    },

    email:{
        type: String,
        trim: true,
        required: [true, 'Email field must be required'],
        unique: [true, 'There is this email. Email field must be unique'],
        validate: [
            (email) => email.includes('@') && email.includes('.'),
            'Email type is not correct.'
        ]
    },

    password: {
        type: String,
        trim: true,
        required: true,
        set: (password) => passwordEncrypt(password)
    },


    blue_tick:{
        type: Boolean,
        default: false,
    },
    

    bio: {
        type: String,
        trim: true,
    },

    private: {
        type: Boolean,
        default: true,
    },

    followers:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
           }
        ],
    // followers_count: {
    //     type:Number,
    //     set: function() {
    //         return this.followers.length;
    //       }
    // },

    following:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
           }
        ],

    // following_count: {
    //     type:Number,
    //     set: function() {
    //         return this.following.length;
    //       }
    // },

    image: {//mongo media
        type: String,
        trim: true,
    },

    background:{
        type: String,
        trim: true,
    },
    
    follow_request_sent: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
           }
        ],


    bookmarks:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Tweet'
           }
        ],
       
}, { collection: 'users', timestamps: true })

UserSchema.virtual('followers_count').get(function() {
    return this.followers.length;
});

UserSchema.virtual('following_count').get(function() {
    return this.following.length;
});
/* ------------------------------------------------------- */
module.exports = mongoose.model('User', UserSchema)
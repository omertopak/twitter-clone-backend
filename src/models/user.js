"use strict"


const { mongoose } = require('../configs/dbConnection')

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

    follewers:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
           }
        ],
    followers_count: {
        type:Number,
        default:function () {
            return this.follewers.length;
        },
    },

    following:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
           }
        ],

    following_count: {
        type:Number,
        default:function () {
            return this.following.length;
        },
    },

    profile_image_url_https: {//mongo media
        type: String,
        trim: true,
    },
    
    follow_request_sent: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
           }
        ],

    notifications: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Notification'
           }
        ],

    bookmarks:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Tweet'
           }
        ],
       
}, { collection: 'user', timestamps: true })

/* ------------------------------------------------------- */
module.exports = mongoose.User('User', UserSchema)
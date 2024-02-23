"use strict"


const { mongoose } = require('../configs/dbConnection')

const UserSchema = new mongoose.Schema({

    name: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    username:{ 
        type: String,
        trim: true,
        required: true,
        unique: true
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

    description: {
       
    },

    protected: {
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
       
    },
    
    follow_request_sent: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
           }
        ],

    notifications: {
       
    },

    bookmarks:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Tweet'
           }
        ],
       
}, { collection: 'user', timestamps: true })

/* ------------------------------------------------------- */
// FOR REACT PROJECT
UserSchema.pre('init', function(data) {
    data.id = data._id
    data.createds = data.createdAt.toLocaleDateString('tr-tr')
})
/* ------------------------------------------------------- */
module.exports = mongoose.User('User', UserSchema)
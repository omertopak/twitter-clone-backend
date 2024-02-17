"use strict"


const { mongoose } = require('../configs/dbConnection')

const UserSchema = new mongoose.Schema({

    name: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    location: {
       
    },
    description: {
       
    },
    protected: {
       
    },
    verified: {
       
    },
    followers_count: {
       
    },
    friends_count: {
       
    },
    created_at: {
       
    },
    profile_image_url_https: {
       
    },
    following: {
       
    },
    follow_request_sent: {
       
    },
    notifications: {
       
    },
       

}, { collection: 'user', timestamps: true })

/* ------------------------------------------------------- */
// FOR REACT PROJECT:
UserSchema.pre('init', function(data) {
    data.id = data._id
    data.createds = data.createdAt.toLocaleDateString('tr-tr')
})
/* ------------------------------------------------------- */
module.exports = mongoose.User('User', UserSchema)
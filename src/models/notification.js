"use strict"


// const { mongoose } = require('../configs/dbConnection')
const mongoose = require('mongoose')
const NotificationSchema = new mongoose.Schema({

    name: {
        type: String,
        trim: true,
        required: true,
        unique: true
    }
       

}, { collection: 'notification', timestamps: true })

/* ------------------------------------------------------- */
module.exports = mongoose.model('Notification', NotificationSchema)
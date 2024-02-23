"use strict"


const { mongoose } = require('../configs/dbConnection')

const ModelSchema = new mongoose.Schema({

    name: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },

    readed:{
        type:Boolean,
        default:false,
    },

       

}, { collection: 'model', timestamps: true })

/* ------------------------------------------------------- */
module.exports = mongoose.model('Model', ModelSchema)
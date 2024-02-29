"use strict"


const { mongoose } = require('../configs/dbConnection')

const ModelSchema = new mongoose.Schema({

    text: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },

    media:{}

}, { collection: 'model', timestamps: true })

/* -------------------------------------------------------- */
module.exports = mongoose.model('Model', ModelSchema)
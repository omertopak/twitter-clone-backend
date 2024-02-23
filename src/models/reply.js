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

/* ------------------------------------------------------- */
// FOR REACT PROJECT:
ModelSchema.pre('init', function(data) {
    data.id = data._id
    data.createds = data.createdAt.toLocaleDateString('tr-tr')
})
/* ------------------------------------------------------- */
module.exports = mongoose.model('Model', ModelSchema)
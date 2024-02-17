"use strict"


const { mongoose } = require('../configs/dbConnection')

const TwitSchema = new mongoose.Schema({

    name: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },

    image: { // URL
        type: String,
        trim: true
    }

}, { collection: 'brands', timestamps: true })

/* ------------------------------------------------------- */
// FOR REACT PROJECT:
BrandSchema.pre('init', function(data) {
    data.id = data._id
    data.createds = data.createdAt.toLocaleDateString('tr-tr')
})
/* ------------------------------------------------------- */
module.exports = mongoose.model('Brand', BrandSchema)
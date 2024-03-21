"use strict"

const Notification = require('../models/notification')

module.exports = {

    create: async (req, res) => {

        const data = await Notification.create(req.body)
        // const data = req.bod
       

        res.status(201).send({
        error: false,
        body: req.body,
        result: data,
        // data:data
        })
        
        
    },

}
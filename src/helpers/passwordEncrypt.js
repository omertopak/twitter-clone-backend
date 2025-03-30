"use strict"

const { pbkdf2Sync, randomBytes } = require('node:crypto');
const keyCode = process.env.SECRET_KEY; 
const loopCount = 1000; 
const charCount = 32; 
const encType = 'sha512'; 

module.exports = function (password) {
    
    const salt = 'sifrelemekodu';
    
    
    return pbkdf2Sync(password, salt, loopCount, charCount, encType).toString('hex');
}

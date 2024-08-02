"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// passwordEncrypt(password:string):

const { pbkdf2Sync, randomBytes } = require('node:crypto');
const keyCode = process.env.SECRET_KEY; // Ortam değişkeni veya başka bir şekilde ayarlanmalı
const loopCount = 1000; // İterasyon sayısı
const charCount = 32; // Anahtar uzunluğu
const encType = 'sha512'; // Şifreleme algoritması

module.exports = function (password) {
    // Rastgele bir salt oluştur
    const salt = randomBytes(16).toString('hex');
    
    // Şifreyi ve salt'ı hashle
    return pbkdf2Sync(password, salt, loopCount, charCount, encType).toString('hex');
}

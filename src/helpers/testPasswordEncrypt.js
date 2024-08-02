// testPasswordEncrypt.js

const passwordEncrypt = require('./passwordEncrypt'); // Doğru yolu belirleyin

const testPassword = 'testPassword123'; // Test etmek istediğiniz şifre
const encryptedPassword = passwordEncrypt(testPassword);

console.log('Test Şifresi:', testPassword);
console.log('Şifrelenmiş Şifre:', encryptedPassword);

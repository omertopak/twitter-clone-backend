const multer = require('multer');
const path = require('path');

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads'); // Dosyaların saklanacağı dizin
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Benzersiz dosya adı oluşturma
  }
});

// Multer middleware
const upload = multer({ storage: storage });

module.exports = upload;

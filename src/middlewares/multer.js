const multer = require('multer');
const path = require('path');

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../uploads'); // Dosyaların saklanacağı dizin
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
},
});

// Multer middleware
const upload = multer({ storage: storage });

module.exports = upload;

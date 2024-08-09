const multer = require('multer');
const path = require('path');

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads'));  
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
},
});

// Multer middleware
const upload = multer({ 
  storage: storage, 
  limits: {fileCount:4} 
});

module.exports = upload;

const multer = require('multer');
const { storage } = require('../config/cloudinaryConfig'); // Cloudinary storage configuration

const upload = multer({ storage });

module.exports = upload;

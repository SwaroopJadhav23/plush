const multer = require('multer');
const path = require('path');
const sharp = require('sharp');
const fs = require('fs');

// Use memory storage to process image in-memory first
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// Middleware to convert uploaded image to webp format
const convertToWebp = async (req, res, next) => {
  if (!req.file) {
    return next();
  }

  try {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const filename = `${req.file.fieldname}-${uniqueSuffix}.webp`;
    const uploadsDir = path.join(__dirname, '../uploads/');

    // Ensure uploads directory exists
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const outputPath = path.join(uploadsDir, filename);

    // Convert buffer to webp and save to file
    await sharp(req.file.buffer)
      .webp({ quality: 80 })
      .toFile(outputPath);

    // Update req.file properties so downstream controllers/routes continue to work seamlessly
    req.file.filename = filename;
    req.file.path = outputPath;
    req.file.mimetype = 'image/webp';
    
    // Clear buffer from memory
    delete req.file.buffer;

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  upload,
  convertToWebp
};

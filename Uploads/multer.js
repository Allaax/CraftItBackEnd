const multer = require('multer');

// Memory storage for the images
const storage = multer.memoryStorage();

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 }, // Limit file size to 5MB per image
    fileFilter: (req, file, cb) => {
        // Accept only image files
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new AppError('Only image files are allowed!', 400), false);
        }
    }
});

// Handle multiple image uploads (up to 5)
exports.uploadProductImages = upload.array('images', 5);

// create multer midddleware for upload video
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const uuid = require('uuid').v4
const { promisify } = require('util');
const unlinkAsync = promisify(fs.unlink);


module.exports = {
    uploadVideo: multer({
        storage: multer.memoryStorage(),
        fileFilter: (req, file, cb) => {
            const ext = path.extname(file.originalname);
            if (ext !== '.mp4') {
                return cb(new Error('Only videos are allowed'));
            }
            cb(null, true);
        },
        limits: {
            fileSize: 500 * 1024 * 1024
        }
    }).single('video')
}
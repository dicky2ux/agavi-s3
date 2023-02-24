const express = require('express');
const router = express.Router();
const { uploadVideo } = require('../middlewares/multer.service');
const { s3Upload, s3Fetch, s3Delete } = require('../controllers/index');

router.post('/upload', uploadVideo, s3Upload);
router.get('/fetch/:uuid', s3Fetch);
router.delete('/delete/:uuid', s3Delete);

module.exports = router;

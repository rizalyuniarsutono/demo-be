const express = require('express');
const router = express.Router();
const fileUploadController = require('../controller/fileUpload');
const upload = require('../middleware/upload')
// const {protect} = require('../middleware/auth');

router.post('/upload', upload.single('file'), fileUploadController.uploadFile);
router.get("/pdf/:id", fileUploadController.getFile);
router.get("/excel/:id", fileUploadController.getFileExcel);

module.exports = router
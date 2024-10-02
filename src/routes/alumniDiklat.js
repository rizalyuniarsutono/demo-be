const express = require('express');
const router = express.Router();
const alumniDiklatController = require('../controller/cekCalonPeserta');
const upload = require('../middleware/upload')
const {protect} = require('../middleware/auth');

router.post("/cek-calpes", upload.single('file'), alumniDiklatController.cekCalpes);
router.post('/import-alumni', upload.single('file'), alumniDiklatController.createAlumni);
router.get("/", alumniDiklatController.getAll);

module.exports = router
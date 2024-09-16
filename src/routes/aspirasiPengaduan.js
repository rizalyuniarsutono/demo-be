const express = require('express');
const router = express.Router();
const aspirasiPengaduanController = require('../controller/aspirasiPengaduan');
const {protect} = require('../middleware/auth');

router.post("/create-aspirasi-pengaduan", aspirasiPengaduanController.create);
router.get("/", aspirasiPengaduanController.getAll);
router.patch("/:id", aspirasiPengaduanController.updateData);
router.patch("/:id/tindak-lanjut", aspirasiPengaduanController.updateTindakLanjut);

module.exports = router
const express = require('express');
const router = express.Router();
const usulanPesertaController = require('../controller/usulanPeserta');
const {protect} = require('../middleware/auth');

router.post("/create-usulan", usulanPesertaController.createUsulan);
router.get("/", usulanPesertaController.getAll);
// router.patch("/:id", usulanPesertaController.updateData);
// router.patch("/:id/tindak-lanjut", usulanPesertaController.updateTindakLanjut);

module.exports = router
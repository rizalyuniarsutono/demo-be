const express = require('express')
const router = express.Router()
const alumniDiklatRouter = require('../routes/alumniDiklat')
const userRouter = require('../routes/user')
const aspirasiPengaduan = require('../routes/aspirasiPengaduan')
const usulanPeserta = require('../routes/usulanPeserta')
const uploadFile = require('../routes/fileUpload')

router.use('/alumni-diklat', alumniDiklatRouter);
router.use('/user', userRouter);
router.use('/aspirasi-pengaduan', aspirasiPengaduan );
router.use('/usulan-peserta', usulanPeserta);
router.use('/file', uploadFile);

module.exports = router
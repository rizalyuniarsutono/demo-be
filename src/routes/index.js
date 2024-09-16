const express = require('express')
const router = express.Router()
const alumniDiklatRouter = require('../routes/alumniDiklat')
const userRouter = require('../routes/user')
const aspirasiPengaduan = require('../routes/aspirasiPengaduan')

router.use('/alumni-diklat', alumniDiklatRouter);
router.use('/user', userRouter);
router.use('/aspirasi-pengaduan', aspirasiPengaduan )

module.exports = router
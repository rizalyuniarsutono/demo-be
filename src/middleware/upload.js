const multer = require('multer')
const createError = require('http-errors')

// Konfigurasi penyimpanan multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'src/upload');
  },
  filename: function (req, file, cb) {
    cb(null, new Date().getTime() + '-' + (file.originalname.replace(/ /g, '-')));
  }
});

// Filter file untuk memvalidasi file Excel yang diunggah
const fileFiltered = (req, file, cb) => {
  const fileSize = parseInt(req.headers['content-length']);
  try {
    if (fileSize > 2 * 1024 * 1024) throw 'File size more than 2MB'; // Batas ukuran 2MB
    if (!file.originalname.match(/\.(xls|xlsx)$/)) throw 'File format must be XLS or XLSX'; // Hanya menerima format Excel
    cb(null, true);
  } catch (error) {
    cb(new createError(400, error));
  }
};

// Konfigurasi upload dengan multer
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 2 * 1024 * 1024 // Batas ukuran file 2MB
  },
  fileFilter: fileFiltered
});

module.exports = upload
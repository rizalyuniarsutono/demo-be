const { createFile, getFileById } = require("../model/file");

const commonHelper = require('../helper/common');
const { v4: uuidv4 } = require("uuid");
const xlsx = require('xlsx');

const fs = require("fs");
const path = require("path");

const fileUploadController = {
  uploadFile: async (req, res) => {
    const file = req.file;
    const { tipe } = req.body;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const fileId = uuidv4();
    const filePath = file.path.replace(/\\/g, '/'); // Menghindari masalah path pada Windows

    try {
      // Simpan metadata file di database
      await createFile({
        id: fileId,
        filename: file.originalname,
        basepath: filePath,
        mimetype: file.mimetype,
        type: tipe,
        version: 1
      });

      res.status(201).json({
        message: "File uploaded successfully",
        fileId: fileId
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // untuk pdf
  getFile: async (req, res) => {
    const { id } = req.params;

    try {
      const fileData = await getFileById(id);
      if (!fileData) {
        return res.status(404).json({ message: "File not found" });
      }
      const file = fileData.rows[0];
      const filePath = path.resolve(file.basepath);

      if (!fs.existsSync(filePath)) {
        return res.status(404).json({ message: "File not found on server" });
      }

      res.setHeader("Content-Type", file.mimetype);
      res.setHeader("Content-Disposition", `attachment; filename=${file.filename}`);
      fs.createReadStream(filePath).pipe(res);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // untuk excel
  getFileExcel: async (req, res) => {
    const { id } = req.params;
  
    try {
      const fileData = await getFileById(id);  // Mendapatkan data file berdasarkan ID
      if (!fileData) {
        return res.status(404).json({ message: "File not found" });
      }
      const file = fileData.rows[0];
      const filePath = path.resolve(file.basepath);
  
      if (!fs.existsSync(filePath)) {
        return res.status(404).json({ message: "File not found on server" });
      }
  
      // Mengecek apakah file adalah file Excel
      if (!file.filename.match(/\.(xls|xlsx)$/)) {
        return res.status(400).json({ message: "File is not an Excel file" });
      }
  
      // Membaca file Excel
      const workbook = xlsx.readFile(filePath);
      const sheetNames = workbook.SheetNames;
      
      // Mengambil data dari setiap sheet dan mengubahnya menjadi JSON
      const excelData = sheetNames.map(sheet => ({
        sheetName: sheet,
        data: xlsx.utils.sheet_to_json(workbook.Sheets[sheet])
      }));
  
      // Membentuk workbook baru berdasarkan data yang ada
      const newWorkbook = xlsx.utils.book_new();
      excelData.forEach(sheetData => {
        const worksheet = xlsx.utils.json_to_sheet(sheetData.data);
        xlsx.utils.book_append_sheet(newWorkbook, worksheet, sheetData.sheetName);
      });
  
      // Menyimpan workbook sebagai file Excel dan mengirimkannya sebagai respons
      const buffer = xlsx.write(newWorkbook, { type: 'buffer', bookType: 'xlsx' });
  
      res.setHeader('Content-Disposition', `attachment; filename=${file.filename}`);
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.send(buffer);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};
module.exports = fileUploadController;
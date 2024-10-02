const { createUsulanPeserta, getUsulanPesertaById, countData, selectAll } = require("../model/usulanPeserta");

const commonHelper = require('../helper/common');
const { v4: uuidv4 } = require("uuid");
const xlsx = require('xlsx');

const usulanPesertaController = {
  createUsulan: async (req, res) => {
    try {
      const { pengusul, name, hp_no, tanggal, surat_usulan, usulan } = req.body;
      const id = uuidv4();

      const usulanData = {
        id,
        pengusul,
        name,
        hp_no,
        tanggal,
        surat_usulan,
        usulan
      };

      const result = await createUsulanPeserta(usulanData);
      commonHelper.response(res, usulanData, 201, "Usulan peserta berhasil dibuat");
    } catch (error) {
      commonHelper.response(res, null, 500, error.message);
    }
  },

  getAll: async (req, res) => {
    try {
        let sortBy = req.query.sortBy || "pengusul";
        let orderBy = req.query.orderBy || "ASC";
        let search = req.query.search || "";
        const page = Number(req.query.page) || 1;
        const size = Number(req.query.size) || 10;
        const offset = (page - 1) * size;
        const result = await selectAll(search, sortBy, orderBy, size, offset);
        const { rows: [count] } = await countData();
        const totalData = parseInt(count.count);
        const totalPage = Math.ceil(totalData / size);
        const pagination = {
            currentPage: page,
            size: size,
            totalData: totalData,
            totalPage: totalPage,
        };
        commonHelper.response(res, result.rows, 200, "get data success", pagination);
    } catch (error) {
        console.error('Error fetching data:', error.message);
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
},

  // Fungsi untuk mendapatkan usulan peserta berdasarkan ID
  getUsulanPeserta: async (req, res) => {
    try {
      const { id } = req.params; // Mendapatkan ID dari parameter URL
      const usulanPeserta = await getUsulanPesertaById(id);
      if (!usulanPeserta) {
        return commonHelper.response(res, null, 404, "Usulan peserta tidak ditemukan");
      }
      commonHelper.response(res, usulanPeserta, 200, "Usulan peserta ditemukan");
    } catch (error) {
      commonHelper.response(res, null, 500, error.message);
    }
  }
};
module.exports = usulanPesertaController;
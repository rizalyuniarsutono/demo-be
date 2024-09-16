const { create, selectAll, countData, findId, update, updateTindakLanjut } = require("../model/aspirasiPengaduan");
const commonHelper = require('../helper/common');
const { v4: uuidv4 } = require("uuid");

const aspirasiPengaduanController = {
    create: async (req, res) => {
        try {
            const { klasifikasi, judul, namaPelapor, deskripsi, tindakLanjut } = req.body;
            const id = uuidv4();

            let data = {
                id,
                klasifikasi,
                judul,
                namaPelapor,
                deskripsi,
                tindakLanjut,
            };
            create(data)
                .then((result) =>
                    commonHelper.response(res, data, 201, "Berhasil menambahkan aspirasi dan pengaduan")
                )
                .catch((err) => {
                    console.error(err);
                    res.status(500).json({ message: "Gagal menambahkan aspirasi dan pengaduan." });
                });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Terjadi kesalahan internal server." });
        }
    },
    getAll: async (req, res) => {
        try {
            let sortBy = req.query.sortBy || "judul";
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
    updateData: async (req, res) => {
        try {
            const id = req.params.id;
            const { klasifikasi, judul, namaPelapor, deskripsi, tindakLanjut } = req.body;

            const { rowCount } = await findId(id);
            if (!rowCount) {
                return res.json({
                    Message: "data not found"
                });
            }
            const data = {
                id,
                klasifikasi,
                judul,
                namaPelapor,
                deskripsi,
                tindakLanjut
            };

            update(data)
                .then((result) =>
                    commonHelper.response(res, data, 200, "aspirasi dan pengaduan berhasil diupdate.")
                )
                .catch((err) => {
                    console.error(err);
                    res.status(500).json({ message: "Gagal mengubah aspirasi dan pengaduan." });
                });
        } catch (error) {
            console.error('Error fetching data:', error.message);
            res.status(500).json({
                message: "Internal Server Error",
                error: error.message,
            });
        }
    },
    updateTindakLanjut: async (req, res) => {
        try {
            const id = req.params.id;
            const { tindakLanjut } = req.body;

            const { rowCount } = await findId(id);
            if (!rowCount) {
                return res.json({
                    Message: "data not found"
                });
            }
            const data = {
                id,
                tindakLanjut
            };

            updateTindakLanjut(data)
                .then((result) =>
                    commonHelper.response(res, data, 200, "tindak lanjut aspirasi dan pengaduan berhasil diupdate.")
                )
                .catch((err) => {
                    console.error(err);
                    res.status(500).json({ message: "Gagal mengubah aspirasi dan pengaduan." });
                });
        } catch (error) {
            console.error('Error fetching data:', error.message);
            res.status(500).json({
                message: "Internal Server Error",
                error: error.message,
            });
        }
    },
}

module.exports = aspirasiPengaduanController
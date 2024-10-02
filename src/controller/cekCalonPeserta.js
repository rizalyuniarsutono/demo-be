const { findDuplicateAlumni, findIdDiklatNip, findAnd, findOr, insertAlumniDiklat, selectAll, countData, updateAlumni } = require("../model/alumniDiklat");

const commonHelper = require('../helper/common');
const authHelper = require('../helper/auth');
const { v4: uuidv4 } = require("uuid");
const jwt = require('jsonwebtoken');
const xlsx = require('xlsx');

const alumniDiklatController = {
    cekCalpes: async (req, res, next) => {
        try {
            // Ambil file dari request
            const file = req.file;

            // Baca file Excel
            const workbook = xlsx.readFile(file.path);
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const data = xlsx.utils.sheet_to_json(worksheet);

            // Array untuk menyimpan hasil pengecekan duplikat
            let duplicateEntries = [];

            // Iterasi setiap baris data
            for (const row of data) {
                const { IdDiklat: id_diklat, Nama: nama_peserta, Nip: nip, TanggalMulai: tanggal_mulai } = row;

                // Cek dengan findIdDiklatNip
                const { rowCount: countIdDiklatNip, rows: rowsIdDiklatNip } = await findIdDiklatNip(id_diklat, nip);

                if (countIdDiklatNip > 0) {
                    // Jika ditemukan, cek dengan findAnd
                    const { rowCount: countAnd, rows: rowsAnd } = await findAnd(id_diklat, nip, tanggal_mulai);

                    if (countAnd > 0) {
                        // Jika findAnd berhasil
                        duplicateEntries.push({
                            data: rowsAnd[0],
                            message: 'pernah ikut pelatihan dan sedang mengikuti pelatihan'
                        });
                    } else {
                        // Jika findAnd gagal
                        duplicateEntries.push({
                            data: rowsIdDiklatNip[0],
                            message: 'sudah pernah ikut pelatihan'
                        });
                    }
                } else {
                    // Jika findIdDiklatNip gagal, cek dengan findOr
                    const { rowCount: countOr, rows: rowsOr } = await findOr(id_diklat, nip, tanggal_mulai);

                    if (countOr > 0) {
                        // Jika findOr berhasil
                        duplicateEntries.push({
                            data: rowsOr[0],
                            message: 'sedang mengikuti pelatihan'
                        });
                    } else {
                        // Jika findOr gagal
                        duplicateEntries.push({
                            data: {
                                id_diklat: id_diklat,
                                nama_peserta: nama_peserta,
                                nip: nip
                            },
                            message: 'dapat dipanggil ikut pelatihan'
                        });
                    }
                }
            }

            // Kembalikan respons berdasarkan hasil pengecekan
            return res.status(200).json({
                message: "Hasil pengecekan duplikasi data.",
                duplicates: duplicateEntries,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: "Terjadi kesalahan saat memeriksa duplikasi data.",
            });
        }
    },
    // createAlumni: async (req, res, next) => {
    //     try {
    //         const file = req.file;

    //         // Baca file Excel
    //         const workbook = xlsx.readFile(file.path);
    //         const sheetName = workbook.SheetNames[0];
    //         const worksheet = workbook.Sheets[sheetName];
    //         const data = xlsx.utils.sheet_to_json(worksheet);

    //         // Array untuk menyimpan data yang berhasil diinsert
    //         let successfulInserts = [];

    //         for (const row of data) {
    //             const {
    //                 Penyelenggara: penyelenggara,
    //                 NoUrut: no_urut,
    //                 NIP: nip,
    //                 Nama: nama_peserta,
    //                 IdDiklat: id_diklat,
    //                 NamaDiklat: nama_diklat,
    //                 PelaksanaDiklat: pelaksana_diklat,
    //                 LamaDiklat: lama_diklat,
    //                 NomorSertifikat: nomor_sertifikat,
    //                 TanggalSertifikatDiklat: tanggal_sertifikat,
    //                 PejabatSertifikatDiklat: pejabat_sertifikat,
    //                 TanggalMulai: tanggal_mulai,
    //                 TanggalAkhir: tanggal_akhir,
    //                 Peringkat: peringkat,
    //                 Angkatan: angkatan,
    //                 Kelulusan: kelulusan,
    //                 TotalPeserta: total_peserta
    //             } = row;

    //             // Buat ID baru untuk setiap data
    //             const newId = uuidv4();
    //             const alumniData = {
    //                 id: newId,
    //                 id_diklat,
    //                 nama_diklat,
    //                 nama_peserta,
    //                 nip,
    //                 no_urut,
    //                 penyelenggara,
    //                 pelaksana_diklat,
    //                 lama_diklat,
    //                 nomor_sertifikat,
    //                 tanggal_sertifikat,
    //                 pejabat_sertifikat,
    //                 tanggal_mulai,
    //                 tanggal_akhir,
    //                 peringkat,
    //                 angkatan,
    //                 kelulusan,
    //                 total_peserta
    //             };

    //             try {
    //                 // Insert data ke database
    //                 await insertAlumniDiklat(alumniData);
    //                 successfulInserts.push(alumniData);
    //             } catch (insertError) {
    //                 console.error("Error inserting data: ", insertError);
    //             }
    //         }

    //         return res.status(200).json({
    //             message: "Data berhasil diimport.",
    //             successfulInserts: successfulInserts
    //         });
    //     } catch (error) {
    //         console.log(error);
    //         return res.status(500).json({
    //             message: "Terjadi kesalahan saat mengimpor data.",
    //         });
    //     }
    // },
    createAlumni: async (req, res, next) => {
        try {
            const file = req.file;
    
            // Baca file Excel
            const workbook = xlsx.readFile(file.path);
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const data = xlsx.utils.sheet_to_json(worksheet);
    
            // Array untuk menyimpan data yang berhasil diinsert
            let successfulInserts = [];
    
            for (const row of data) {
                const {
                    Penyelenggara: penyelenggara,
                    NoUrut: no_urut,
                    NIP: nip,
                    Nama: nama_peserta,
                    IdDiklat: id_diklat,
                    NamaDiklat: nama_diklat,
                    PelaksanaDiklat: pelaksana_diklat,
                    LamaDiklat: lama_diklat,
                    NomorSertifikat: nomor_sertifikat,
                    TanggalSertifikatDiklat: tanggal_sertifikat,
                    PejabatSertifikatDiklat: pejabat_sertifikat,
                    TanggalMulai: tanggal_mulai,
                    TanggalAkhir: tanggal_akhir,
                    Peringkat: peringkat,
                    Angkatan: angkatan,
                    Kelulusan: kelulusan,
                    TotalPeserta: total_peserta
                } = row;
    
                // Buat ID baru untuk setiap data
                const newId = uuidv4();
                const alumniData = {
                    id: newId,
                    id_diklat,
                    nama_diklat,
                    nama_peserta,
                    nip,
                    no_urut,
                    penyelenggara,
                    pelaksana_diklat,
                    lama_diklat,
                    nomor_sertifikat,
                    tanggal_sertifikat,
                    pejabat_sertifikat,
                    tanggal_mulai,
                    tanggal_akhir,
                    peringkat,
                    angkatan,
                    kelulusan,
                    total_peserta
                };
    
                try {
                    // Cek apakah ada data dengan NIP dan IdDiklat yang sama
                    const existingAlumni = await findIdDiklatNip(id_diklat, nip);
    
                    if (existingAlumni.rows.length > 0) {
                        // Jika ada, update data yang sudah ada
                        await updateAlumni(existingAlumni.rows[0].id, alumniData);
                    } else {
                        // Jika tidak ada, tambahkan data baru
                        await insertAlumniDiklat(alumniData);
                    }
    
                    successfulInserts.push(alumniData);
                } catch (dbError) {
                    console.error("Error processing data: ", dbError);
                }
            }
    
            return res.status(200).json({
                message: "Data berhasil diimport.",
                data: successfulInserts
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: "Terjadi kesalahan saat mengimpor data.",
            });
        }
    },
    
    getAll: async (req, res) => {
        try {
            let sortBy = req.query.sortBy || "nama_diklat";
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
};
module.exports = alumniDiklatController;
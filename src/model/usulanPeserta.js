const Pool = require("../config/db");

const createUsulanPeserta = (data) => {
  const { id, pengusul, name, hp_no, tanggal, surat_usulan, usulan } = data;
  return new Promise((resolve, reject) => {
    Pool.query(
      `INSERT INTO usulan_peserta(id, pengusul, name, hp_no, tanggal, surat_usulan, usulan) VALUES('${id}','${pengusul}','${name}','${hp_no}','${tanggal}','${surat_usulan}','${usulan}')`,
      (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );
  });
};

const selectAll = (search, sortBy, orderBy, size, offset) => {
  return Pool.query(`SELECT * FROM usulan_peserta WHERE pengusul LIKE '%${search}%' ORDER BY ${sortBy} ${orderBy} LIMIT ${size} OFFSET ${offset}`);
};

const countData = () => {
  return Pool.query('SELECT COUNT(*) FROM usulan_peserta')
};

const getUsulanPesertaById = (id) => {
  return new Promise((resolve, reject) => {
    Pool.query(
      `SELECT * FROM usulan_peserta WHERE id='${id}'`,
      [id],
      (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );
  });
};

module.exports = {
  createUsulanPeserta,
  selectAll,
  countData,
  getUsulanPesertaById
};
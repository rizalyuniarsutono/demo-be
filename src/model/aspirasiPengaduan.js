const Pool = require("../config/db");

const create = (data) => {
  const { id, klasifikasi, judul, namaPelapor, deskripsi, tindakLanjut } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO aspirasi_pengaduan(id,klasifikasi,nama_pelapor,judul,deskripsi,tindak_lanjut) VALUES('${id}','${klasifikasi}','${namaPelapor}','${judul}','${deskripsi}','${tindakLanjut}')`,
      (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    )
  );
};

const selectAll = (search, sortBy, orderBy, size, offset) => {
  return Pool.query(`SELECT * FROM aspirasi_pengaduan WHERE judul LIKE '%${search}%' ORDER BY ${sortBy} ${orderBy} LIMIT ${size} OFFSET ${offset}`);
};

const countData = () => {
  return Pool.query('SELECT COUNT(*) FROM aspirasi_pengaduan')
};

const update = (data) => {
  const { id, klasifikasi, judul, namaPelapor, deskripsi, tindakLanjut } = data;
  return Pool.query(`UPDATE aspirasi_pengaduan SET klasifikasi='${klasifikasi}', judul='${judul}', nama_pelapor='${namaPelapor}', deskripsi='${deskripsi}', tindak_lanjut='${tindakLanjut}' WHERE id='${id}'`);
};
const updateTindakLanjut = (data) => {
  const { id, tindakLanjut } = data;
  return Pool.query(`UPDATE aspirasi_pengaduan SET tindak_lanjut='${tindakLanjut}' WHERE id='${id}'`);
};

const findId = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(`SELECT id FROM aspirasi_pengaduan WHERE id='${id}'`, (error, result) => {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  )
};

module.exports = {
  create,
  selectAll,
  countData,
  update,
  findId,
  updateTindakLanjut,
}


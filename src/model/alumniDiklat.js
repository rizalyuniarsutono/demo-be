const Pool = require("../config/db");

const findDuplicateAlumni = (id_diklat, nip, nama_peserta) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      //   `SELECT * FROM alumni_diklat WHERE id_diklat='${id_diklat}' AND nip='${nip}'`,
      `SELECT * FROM alumni_diklat WHERE id_diklat='${id_diklat}' OR (nama_peserta='${nama_peserta}' AND nip='${nip}')`,
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

const findIdDiklatNip = (id_diklat, nip) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      //   `SELECT * FROM alumni_diklat WHERE id_diklat='${id_diklat}' AND nip='${nip}'`,
      `SELECT * FROM alumni_diklat WHERE id_diklat='${id_diklat}' AND nip='${nip}'`,
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


const findOr = (id_diklat, nip, tanggal_mulai) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM alumni_diklat WHERE (id_diklat='${id_diklat}' AND nip='${nip}') OR (nip='${nip}' AND tanggal_mulai='${tanggal_mulai}')`,
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

const findAnd = (id_diklat, nip, tanggal_mulai) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM alumni_diklat WHERE (id_diklat='${id_diklat}' AND nip='${nip}') AND (nip='${nip}' AND tanggal_mulai='${tanggal_mulai}')`,
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

const insertAlumniDiklat = (alumniData) => {
  const { id, id_diklat, nama_diklat, nama_peserta, nip, no_urut, penyelenggara, pelaksana_diklat, lama_diklat, nomor_sertifikat, tanggal_sertifikat, pejabat_sertifikat, tanggal_mulai, tanggal_akhir, peringkat, angkatan, kelulusan, total_peserta } = alumniData;

  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO alumni_diklat (id, id_diklat, nama_diklat, nama_peserta, nip, no_urut, penyelenggara, pelaksana_diklat, lama_diklat, nomor_sertifikat, tanggal_sertifikat, pejabat_sertifikat, tanggal_mulai, tanggal_akhir, peringkat, angkatan, kelulusan, total_peserta)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)`,
      [id, id_diklat, nama_diklat, nama_peserta, nip, no_urut, penyelenggara, pelaksana_diklat, lama_diklat, nomor_sertifikat, tanggal_sertifikat, pejabat_sertifikat, tanggal_mulai, tanggal_akhir, peringkat, angkatan, kelulusan, total_peserta],
      (error, result) => {
        if (!error) {
          console.log("Insert success: ", result);
          resolve(result);
        } else {
          console.log("Insert error: ", error);
          reject(error);
        }
      }
    )
  );
};

const selectAll = (search, sortBy, orderBy, size, offset) => {
  return Pool.query(`SELECT * FROM alumni_diklat WHERE nama_diklat LIKE '%${search}%' ORDER BY ${sortBy} ${orderBy} LIMIT ${size} OFFSET ${offset}`);
};

const countData = () => {
  return Pool.query('SELECT COUNT(*) FROM alumni_diklat')
};

const updateAlumni = (id, alumniData) => {
  const { id_diklat, nama_diklat, nama_peserta, nip, no_urut, penyelenggara, pelaksana_diklat, lama_diklat, nomor_sertifikat, tanggal_sertifikat, pejabat_sertifikat, tanggal_mulai, tanggal_akhir, peringkat, angkatan, kelulusan, total_peserta } = alumniData;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE alumni_diklat
       SET id_diklat='${id_diklat}', nama_diklat='${nama_diklat}', nama_peserta='${nama_peserta}', nip='${nip}', no_urut='${no_urut}', penyelenggara='${penyelenggara}', pelaksana_diklat='${pelaksana_diklat}', lama_diklat='${lama_diklat}', nomor_sertifikat='${nomor_sertifikat}', tanggal_sertifikat='${tanggal_sertifikat}', pejabat_sertifikat='${pejabat_sertifikat}', tanggal_mulai='${tanggal_mulai}', tanggal_akhir='${tanggal_akhir}', peringkat='${peringkat}', angkatan='${angkatan}', kelulusan='${kelulusan}', total_peserta='${total_peserta}'
       WHERE nip='${nip}'`,
      (error, result) => {
        if (!error) {
          console.log("update success: ", result);
          resolve(result);
        } else {
          console.log("update error: ", error);
          reject(error);
        }
      }
    )
  );
};


module.exports = {
  findDuplicateAlumni,
  findIdDiklatNip,
  findAnd,
  findOr,
  insertAlumniDiklat,
  selectAll,
  countData,
  updateAlumni,
};

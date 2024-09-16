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
      [ id, id_diklat, nama_diklat, nama_peserta, nip, no_urut, penyelenggara, pelaksana_diklat, lama_diklat, nomor_sertifikat, tanggal_sertifikat, pejabat_sertifikat, tanggal_mulai, tanggal_akhir, peringkat, angkatan, kelulusan, total_peserta ],
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

module.exports = {
  findDuplicateAlumni,
  findIdDiklatNip,
  findAnd,
  findOr,
  insertAlumniDiklat,
};

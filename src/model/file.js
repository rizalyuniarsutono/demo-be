const Pool = require("../config/db");

const createFile = (data) => {
  const { id, filename, basepath, mimetype, type, version } = data;
  return new Promise((resolve, reject) => {
    Pool.query(
      `INSERT INTO file(id, filename, basepath, mimetype, type, version) VALUES('${id}','${filename}','${basepath}','${mimetype}','${type}','${version}')`,
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

const getFileById = (id) => {
  return new Promise((resolve, reject) => {
    Pool.query(
      `SELECT * FROM file WHERE id='${id}'`,
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
  createFile,
  getFileById
};
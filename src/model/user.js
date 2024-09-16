const Pool = require("../config/db");

// const findEmail = (email) => {
//   return new Promise((resolve, reject) =>
//     Pool.query(
//       `SELECT * FROM users WHERE email='${email}'`,
//       (error, result) => {
//         if (!error) {
//           resolve(result);
//         } else {
//           reject(error);
//         }
//       }
//     )
//   );
// };

const findUsername = (username) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM users WHERE username='${username}'`,
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

const createUser = (data) => {
  const { id, nama, password, username, email, role } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO users(id,nama,username,password,email,role) VALUES('${id}','${nama}','${username}','${password}','${email}','${role}')`,
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
  return Pool.query(`SELECT * FROM users WHERE nama LIKE '%${search}%' ORDER BY ${sortBy} ${orderBy} LIMIT ${size} OFFSET ${offset}`);
};
const countData = () => {
  return Pool.query('SELECT COUNT(*) FROM users')
};

const updateUser = (data) => {
  const { id, email, username, nama, role } = data;
  return Pool.query(`UPDATE users SET email='${email}', username='${username}', nama='${nama}', role='${role}' WHERE id='${id}'`);
};

const findId = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(`SELECT id FROM users WHERE id='${id}'`, (error, result) => {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  )
};

const getById = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(`SELECT * FROM users WHERE id='${id}'`, (error, result) => {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  )
};

const deleteUser = (id) =>{
  return Pool.query(`DELETE FROM users WHERE id='${id}'`);
}

module.exports = {
  // findEmail,
  findUsername,
  createUser,
  selectAll,
  countData,
  updateUser,
  findId,
  deleteUser,
  getById,
};

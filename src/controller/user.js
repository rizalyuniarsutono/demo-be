const { findUsername, createUser, selectAll, countData, findId, updateUser, deleteUser, getById } = require("../model/user");
const commonHelper = require('../helper/common');
const authHelper = require('../helper/auth');
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const jwt = require('jsonwebtoken');

const userController = {
    create: async (req, res) => {
        try {
            const { nama, username, password, email, role } = req.body;
            const { rowCount: usernameCount } = await findUsername(username);
            const salt = bcrypt.genSaltSync(10);
            const passwordHash = bcrypt.hashSync(password, salt);
            const id = uuidv4();

            if (usernameCount > 0) {
                return res.status(400).json({ message: "Username sudah digunakan." });
            }

            let data = {
                id,
                nama,
                username,
                password: passwordHash,
                email,
                role,
            };
            createUser(data)
                .then((result) =>
                    commonHelper.response(res, data, 201, "Berhasil menambahkan akun")
                )
                .catch((err) => {
                    console.error(err);
                    res.status(500).json({ message: "Gagal menambahkan akun." });
                });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Terjadi kesalahan internal server." });
        }
    },
    login: async (req, res, next) => {
        try {
            const { username, password } = req.body;
            const { rows: [user], } = await findUsername(username);
            if (!user) {
                return res.status(403).json({
                    Message: "Username tidak ditemukan"
                })
            }
            const isValidPassword = bcrypt.compareSync(password, user.password);

            if (!isValidPassword) {
                return res.status(403).json({
                    Message: "Username atau Password salah"
                })
            }
            delete user.password;
            const payload = {
                username: user.username,
                role: user.role,
            };
            user.token = authHelper.generateToken(payload);
            user.refreshToken = authHelper.generateRefreshToken(payload);

            commonHelper.response(res, user, 201, "Login Berhasil");
        } catch (error) {
            console.log(error);
        }
    },
    refreshToken: (req, res) => {
        const refreshToken = req.body.refreshToken;
        const decoded = jwt.verify(refreshToken, process.env.SECRETE_KEY_JWT);
        const payload = {
            username: decoded.username,
            role: decoded.role,
        }
        const result = {
            token: authHelper.generateToken(payload),
            refreshToken: authHelper.generateRefreshToken(payload),
        };
        commonHelper.response(res, result, 200);
    },
    getAll: async (req, res) => {
        try {
            let sortBy = req.query.sortBy || "nama";
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
    getById: async (req, res) => {
        try {
            const id = req.params.id;
            const {
                rows: [data],
            } = await getById(id);
            delete data.password;
            commonHelper.response(res, data, 200);
        } catch (error) {
            console.error('Error fetching data:', error.message);
            res.status(500).json({
                message: "Akun tidak ditemukan",
                error: error.message,
            });
        }
    },
    updateUser: async (req, res) => {
        try {
            const id = req.params.id;
            const { email, username, nama, role } = req.body;

            const { rowCount } = await findId(id);
            if (!rowCount) {
                return res.json({
                    Message: "data not found"
                });
            }
            const data = {
                id,
                email,
                username,
                nama,
                role,
            };

            updateUser(data)
                .then((result) =>
                    commonHelper.response(res, data, 200, "Akun berhasil diupdate.")
                )
                .catch((err) => {
                    console.error(err);
                    res.status(500).json({ message: "Gagal mengubah akun." });
                });
        } catch (error) {
            console.error('Error fetching data:', error.message);
            res.status(500).json({
                message: "Internal Server Error",
                error: error.message,
            });
        }
    },
    delete: async (req, res) => {
        try {
            const id = req.params.id;
            const { rowCount } = await findId(id);
            if (!rowCount) {
                res.json({ message: "ID is Not Found" });
            }
            deleteUser(id)
                .then((result) =>
                    commonHelper.response(res, result.rows, 200, "Berhasil menghapus user")
                )
                .catch((err) => {
                    console.error(err);
                    res.status(500).json({ message: "Gagal menghapus user." });
                });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Terjadi kesalahan internal server." });
        }
    },
}
module.exports = userController
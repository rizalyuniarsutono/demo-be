const express = require('express');
const router = express.Router();
const userController = require('../controller/user');
// const {protect} = require('../middleware/auth');

router.get("/", userController.getAll);
router.post("/create-user", userController.create);
router.post("/login", userController.login);
router.post("/refresh-token", userController.refreshToken);
router.patch("/:id", userController.updateUser);
router.get("/:id", userController.getById);
router.delete("/:id", userController.delete);

module.exports = router
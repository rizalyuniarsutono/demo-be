const express = require('express');
const router = express.Router();
const userController = require('../controller/user');
const { isAdmin } = require('../middleware/auth');
const {protect} = require('../middleware/auth');

router.get("/", protect, isAdmin, userController.getAll);
router.post("/create-user", protect, isAdmin, userController.create);
router.post("/login", userController.login);
router.post("/refresh-token", userController.refreshToken);
router.patch("/:id", protect, isAdmin, userController.updateUser);
router.get("/:id", userController.getById);
router.delete("/:id", protect, isAdmin, userController.delete);

module.exports = router
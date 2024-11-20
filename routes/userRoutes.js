const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { auth, isAdmin } = require("../middleware/auth");

// Public routes
router.post("/register", userController.register);
router.post("/login", userController.login);

// Protected routes (admin only)
router.get("/", auth, isAdmin, userController.getAllUsers);
router.post("/", auth, isAdmin, userController.createUser);
router.put("/:id", auth, isAdmin, userController.updateUser);
router.delete("/:id", auth, isAdmin, userController.deleteUser);

module.exports = router;

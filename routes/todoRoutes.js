const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todoController");
const { auth } = require("../middleware/auth");

router.post("/", auth, todoController.create);
router.get("/", auth, todoController.getAll);
router.get("/:id", auth, todoController.getOne);
router.put("/:id", auth, todoController.update);
router.delete("/:id", auth, todoController.delete);

module.exports = router;

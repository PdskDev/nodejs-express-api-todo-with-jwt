// const express = require("express");
// const router = express.Router();
// const todoController = require("../controllers/todoController");
// const { auth } = require("../middleware/auth");

// router.post("/", auth, todoController.create);
// router.get("/", auth, todoController.getAll);
// router.get("/:id", auth, todoController.getOne);
// router.put("/:id", auth, todoController.update);
// router.delete("/:id", auth, todoController.delete);

// module.exports = router;
const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todoController");
const { auth } = require("../middleware/auth");

/**
 * @swagger
 * components:
 *   schemas:
 *     Todo:
 *       type: object
 *       required:
 *         - title
 *         - description
 *       properties:
 *         title:
 *           type: string
 *           description: Todo title
 *         description:
 *           type: string
 *           description: Todo description
 *         completed:
 *           type: boolean
 *           default: false
 *         user:
 *           type: string
 *           description: User ID who created the todo
 */

/**
 * @swagger
 * /todos:
 *   post:
 *     summary: Create a new todo
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Todo'
 *     responses:
 *       201:
 *         description: Todo created successfully
 *       401:
 *         description: Unauthorized
 */
router.post("/", auth, todoController.create);

/**
 * @swagger
 * /todos:
 *   get:
 *     summary: Get all todos (Admin gets all, Users get their own)
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of todos
 *       401:
 *         description: Unauthorized
 */
router.get("/", auth, todoController.getAll);

/**
 * @swagger
 * /todos/{id}:
 *   get:
 *     summary: Get a specific todo
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Todo details
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Todo not found
 */
router.get("/:id", auth, todoController.getOne);

/**
 * @swagger
 * /todos/{id}:
 *   put:
 *     summary: Update a todo
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Todo'
 *     responses:
 *       200:
 *         description: Todo updated successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Todo not found
 */
router.put("/:id", auth, todoController.update);

/**
 * @swagger
 * /todos/{id}:
 *   delete:
 *     summary: Delete a todo
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Todo deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Todo not found
 */
router.delete("/:id", auth, todoController.delete);

module.exports = router;

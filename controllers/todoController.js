const Todo = require("../models/todo");

const todoController = {
  create: async (req, res) => {
    try {
      const todo = new Todo({
        ...req.body,
        user: req.user._id,
      });
      await todo.save();
      res.status(201).json(todo);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  getAll: async (req, res) => {
    try {
      let todos;
      if (req.user.role === "admin") {
        todos = await Todo.find().populate("user", "name email");
      } else {
        todos = await Todo.find({ user: req.user._id });
      }
      res.json(todos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getOne: async (req, res) => {
    try {
      const todo = await Todo.findById(req.params.id);
      if (!todo) {
        return res.status(404).json({ error: "Todo not found" });
      }

      if (
        req.user.role !== "admin" &&
        todo.user.toString() !== req.user._id.toString()
      ) {
        return res.status(403).json({ error: "Access denied" });
      }

      res.json(todo);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const todo = await Todo.findById(req.params.id);
      if (!todo) {
        return res.status(404).json({ error: "Todo not found" });
      }

      if (
        req.user.role !== "admin" &&
        todo.user.toString() !== req.user._id.toString()
      ) {
        return res.status(403).json({ error: "Access denied" });
      }

      Object.assign(todo, req.body);
      await todo.save();
      res.json(todo);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const todo = await Todo.findById(req.params.id);
      if (!todo) {
        return res.status(404).json({ error: "Todo not found" });
      }

      if (
        req.user.role !== "admin" &&
        todo.user.toString() !== req.user._id.toString()
      ) {
        return res.status(403).json({ error: "Access denied" });
      }

      await todo.deleteOne();
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = todoController;

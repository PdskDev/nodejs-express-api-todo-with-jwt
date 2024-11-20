// const express = require("express");
// const mongoose = require("mongoose");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");
// const User = require("./models/user");
// const Todo = require("./models/todo");
// const { auth, isAdmin } = require("./middleware/auth");
// require("dotenv").config();

// const app = express();
// const port = process.env.PORT || 3000;

// app.use(express.json());

// mongoose
//   .connect(process.env.MONGODB_URI)
//   .then(() => console.log("Connected to MongoDB"))
//   .catch((err) => console.error("MongoDB connection error:", err));

// // User Authentication Routes
// app.post("/users/register", async (req, res) => {
//   try {
//     const user = new User(req.body);
//     await user.save();
//     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
//     res.status(201).json({ user, token });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// app.post("/users/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email }).select("-password");

//     if (!user || !user.isActive) {
//       throw new Error("Invalid login credentials");
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       throw new Error("Invalid login credentials");
//     }

//     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
//     res.json({ user, token });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// // User Management Routes (Admin only)
// app.get("/users", auth, isAdmin, async (req, res) => {
//   try {
//     const users = await User.find({}).select("-password");
//     res.json(users);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// app.post("/users", auth, isAdmin, async (req, res) => {
//   try {
//     const user = new User(req.body);
//     await user.save();
//     if (user) {
//       /* res.status(201).json({
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//         isActive: user.isActive,
//       }); */
//       res.status(201).json({
//         _id: user._id,
//         message: "User was successfully created",
//       });
//     } else {
//       res.status(500).json({ error: "Server error" });
//     }
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// app.put("/users/:id", auth, isAdmin, async (req, res) => {
//   try {
//     const user = await User.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//       runValidators: true,
//     }).select("-password");

//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }
//     res.json(user);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// app.delete("/users/:id", auth, isAdmin, async (req, res) => {
//   try {
//     const user = await User.findByIdAndDelete(req.params.id);
//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }
//     res.status(204).send();
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Todo Routes
// app.post("/todos", auth, async (req, res) => {
//   try {
//     const todo = new Todo({
//       ...req.body,
//       user: req.user._id,
//     });
//     await todo.save();
//     res.status(201).json(todo);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// app.get("/todos", auth, async (req, res) => {
//   try {
//     let todos;
//     if (req.user.role === "admin") {
//       todos = await Todo.find().populate("user", "name email");
//     } else {
//       todos = await Todo.find({ user: req.user._id });
//     }
//     res.json(todos);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// app.get("/todos/:id", auth, async (req, res) => {
//   try {
//     const todo = await Todo.findById(req.params.id);
//     if (!todo) {
//       return res.status(404).json({ error: "Todo not found" });
//     }

//     if (
//       req.user.role !== "admin" &&
//       todo.user.toString() !== req.user._id.toString()
//     ) {
//       return res.status(403).json({ error: "Access denied" });
//     }

//     res.json(todo);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// app.put("/todos/:id", auth, async (req, res) => {
//   try {
//     const todo = await Todo.findById(req.params.id);
//     if (!todo) {
//       return res.status(404).json({ error: "Todo not found" });
//     }

//     if (
//       req.user.role !== "admin" &&
//       todo.user.toString() !== req.user._id.toString()
//     ) {
//       return res.status(403).json({ error: "Access denied" });
//     }

//     Object.assign(todo, req.body);
//     await todo.save();
//     res.json(todo);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// app.delete("/todos/:id", auth, async (req, res) => {
//   try {
//     const todo = await Todo.findById(req.params.id);
//     if (!todo) {
//       return res.status(404).json({ error: "Todo not found" });
//     }

//     if (
//       req.user.role !== "admin" &&
//       todo.user.toString() !== req.user._id.toString()
//     ) {
//       return res.status(403).json({ error: "Access denied" });
//     }

//     await todo.remove();
//     res.status(204).send();
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

//***** */
// const express = require("express");
// const mongoose = require("mongoose");
// require("dotenv").config();

// const userRoutes = require("./routes/userRoutes");
// const todoRoutes = require("./routes/todoRoutes");

// const app = express();
// const port = process.env.PORT || 3000;

// // Middleware
// app.use(express.json());

// // MongoDB Connection
// mongoose
//   .connect(process.env.MONGODB_URI)
//   .then(() => console.log("Connected to MongoDB"))
//   .catch((err) => console.error("MongoDB connection error:", err));

// // Routes
// app.use("/users", userRoutes);
// app.use("/todos", todoRoutes);

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ error: "Something went wrong!" });
// });

// // 404 handler
// app.use((req, res) => {
//   res.status(404).json({ error: "Route not found" });
// });

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
/** */
const express = require("express");
const mongoose = require("mongoose");
const swaggerUi = require("swagger-ui-express");
const specs = require("./swagger");
require("dotenv").config();

const userRoutes = require("./routes/userRoutes");
const todoRoutes = require("./routes/todoRoutes");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Routes
app.use("/users", userRoutes);
app.use("/todos", todoRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(
    `Swagger documentation available at http://localhost:${port}/api-docs`
  );
});

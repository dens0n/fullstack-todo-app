const express = require("express");
const router = express.Router();
const {
    getTodos,
    createTodo,
    editTodo,
    deleteTodo,
} = require("../controllers/todos.controllers");

//CRUD

// Get users todos
router.get("/:userEmail", getTodos);

//CREATE a todo
router.post("/", createTodo);

//EDIT a todo
router.put("/:id", editTodo);

// DELETE a todo
router.delete("/:id", deleteTodo);

module.exports = router;

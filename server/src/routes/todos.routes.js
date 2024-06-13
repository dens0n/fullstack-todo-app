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
router.get("/todos/:userEmail", getTodos);

//CREATE a todo
router.post("/todos", createTodo);

//EDIT a todo
router.put("/todos/:id", editTodo);

// DELETE a todo
router.delete("/todos/:id", deleteTodo);

module.exports = router;

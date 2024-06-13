const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { v4: uuid } = require("uuid");

// Get all todos connected to a user
exports.getTodos = async (req, res) => {
    const { userEmail } = req.params;
    try {
        const todos = await prisma.todo.findMany({
            where: {
                userEmail: userEmail,
            },
        });
        res.json(todos);
    } catch (err) {
        console.log(err);
    }
};

// create a new todo
exports.createTodo = async (req, res) => {
    const { user_email, title, progress, date } = req.body;
    const id = uuid();
    try {
        const newTodo = await prisma.todo.create({
            data: {
                id: id,
                userEmail: user_email,
                title: title,
                progress: progress,
                date: date,
            },
        });
        res.json(newTodo);
    } catch (err) {
        console.log(err);
    }
};

//Edit a todo
exports.editTodo = async (req, res) => {
    const { id } = req.params;
    const { user_email, title, progress, date } = req.body;
    try {
        const editTodo = await prisma.todo.update({
            where: { id: id },
            data: {
                userEmail: user_email,
                title: title,
                progress: progress,
                date: date,
            },
        });
        res.json(editTodo);
    } catch (err) {
        console.log(err);
    }
};

// Delete a todo
exports.deleteTodo = async (req, res) => {
    const { id } = req.params;
    try {
        const deleteTodo = await prisma.todo.delete({
            where: { id: id },
        });
        res.json(deleteTodo);
    } catch (err) {
        console.log(err);
    }
};

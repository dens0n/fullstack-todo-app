const PORT = process.env.PORT ?? 8000;
const express = require("express");
const cors = require("cors");
const app = express();
const pool = require("./db/db");
const { v4: uuid } = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = "your_jwt_secret";
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// get all todos
app.get("/todos/:userEmail", async (req, res) => {
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
});

// create a new todo
app.post("/todos", async (req, res) => {
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
});

//edit a todo
app.put("/todos/:id", async (req, res) => {
    const { id } = req.params;
    const { user_email, title, progress, date } = req.body;
    console.log(progress);
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
});

//Delete a todo
app.delete("/todos/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const deleteTodo = await prisma.todo.delete({
            where: { id: id },
        });
        res.json(deleteTodo);
    } catch (err) {
        console.log(err);
    }
});

// Sing up
app.post("/signup", async (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    try {
        const signUp = await prisma.user.create({
            data: {
                email: email,
                hashedPassword: hashedPassword,
            },
        });
        const token = jwt.sign({ email }, secret, { expiresIn: "1hr" });
        res.json({ email, token });
    } catch (err) {
        console.log(err);
        res.json({ detail: err.message });
    }
});

// log in
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await prisma.user.findUnique({
            where: { email: email },
        });
        if (!user) {
            return res.json({ detail: "user does not exist" });
        }
        const success = await bcrypt.compare(password, user.hashedPassword);
        const token = jwt.sign({ email }, secret, { expiresIn: "1hr" });
        if (success) {
            res.json({ email: user.email, token });
        } else {
            res.json({ detail: "Login failed" });
        }
    } catch (err) {
        console.log(err);
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

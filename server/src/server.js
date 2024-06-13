const PORT = process.env.PORT ?? 8000;
const express = require("express");
const cors = require("cors");

const todoRoutes = require("./routes/todos.routes");
const authRoutes = require("./routes/auth.routes");

const app = express();

//middlewere
app.use(cors());
app.use(express.json());

//API routes
app.use(todoRoutes);
app.use(authRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
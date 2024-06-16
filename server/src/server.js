const PORT = process.env.PORT ?? 8000;
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const todoRoutes = require("./routes/todos.routes");
const authRoutes = require("./routes/auth.routes");
const auth = require("./middleware/auth.middleware");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API routes
app.use("/todos", auth, todoRoutes); 
app.use(authRoutes); 

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

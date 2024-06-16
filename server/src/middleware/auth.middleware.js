const jwt = require("jsonwebtoken");
const secret = "your_jwt_secret";

const auth = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).send("Access denied. No token provided.");
    }

    const token = authHeader.split(" ")[1]; // Extract the token part

    if (!token) {
        return res.status(403).send("No token provided");
    }

    try {
        const decoded = jwt.verify(token, secret);
        req.user = decoded;
        next();
    } catch (error) {
        console.error(error);
        res.status(400).send("Invalid token");
    }
};

module.exports = auth;

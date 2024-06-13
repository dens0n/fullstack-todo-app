const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = "your_jwt_secret";

// signup a new account
exports.signup = async (req, res) => {
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
};

// Log in to an account
exports.login = async (req, res) => {
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
};
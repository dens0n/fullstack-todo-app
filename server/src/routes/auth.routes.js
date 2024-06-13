const express = require("express");
const router = express.Router();
const { signup, login } = require("../controllers/auth.controllers");

//ROUTES

// CREATE account
router.post("/signup", signup);

//LOGIN to an accocunt
router.post("/login", login);

module.exports = router;

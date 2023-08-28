const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

const auth_controller = require("../controllers/auth_controller");

//REGISTER
router.post("/register", auth_controller.register);

//Login
router.post("/login", auth_controller.login);

module.exports = router;

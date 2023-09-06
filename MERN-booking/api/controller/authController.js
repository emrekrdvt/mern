const User = require("../models/User");
const bcrypt = require("bcrypt");
const { createError } = require("../utils/error");
const { myRes } = require("../utils/res");
var jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const path = require("path");

const JWT = process.env.JWT;

exports.register = async (req, res, next) => {
  try {
    const saltRounds = 10;
    const hash = bcrypt.hashSync(req.body.password, saltRounds);

    const newUser = new User({
      ...req.body,
      password: hash,
    });

    await newUser.save();
    res.status(200).json("user has ben created");
  } catch (error) {
    next(error);
  }
};
exports.login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "User not found"));
    const cmpPass = bcrypt.compareSync(req.body.password, user.password);
    if (!cmpPass) return next(createError(400, "Wrong password"));

    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, JWT);

    const { password, isAdmin, ...other } = user._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({ ...other });
  } catch (error) {
    next(error);
  }
};

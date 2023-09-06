const jwt = require("jsonwebtoken");
const { myRes } = require("./res");
const { createError } = require("./error");
const dotenv = require("dotenv").config();
const path = require("path");

const JWT = process.env.JWT;

exports.verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return next(createError(401, "You are not authenticated"));

  jwt.verify(token, JWT, (err, user) => {
    if (err) return next(createError(403, "Token is not valid "));
    req.user = user;
    next();
  });
};

exports.verifyUser = (req, res, next) => {
  this.verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) next();
    else return next(createError(403, "You are not autharized "));
  });
};

exports.verifyAdmin = (req, res, next) => {
  this.verifyToken(req, res, () => {
    if (req.user.isAdmin) next();
    else return next(createError(403, "You are not autharized "));
  });
};

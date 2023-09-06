const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const path = require("path");
const mongoose = require("mongoose");
var cookieParser = require("cookie-parser");

const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const hotelsRoute = require("./routes/hotels");
const roomsRoute = require("./routes/rooms");

const DBURL = process.env.DBURL;

const connect = async () => {
  try {
    await mongoose.connect(DBURL);
    console.log(`db is rdy`);
  } catch (error) {
    console.log(error);
  }
};

app.use(cookieParser())
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

app.use((err, req, res, next) => {
  const errStatus = err.status || 500;
  const errMsg = err.message || "Something went wrong!";

  return res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMsg,
    stack: err.stack,
  });
});

app.listen(8080, () => {
  connect();
  console.log(`Connected to 8080`);
});

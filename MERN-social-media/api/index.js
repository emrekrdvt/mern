const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const helment = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const convRoute = require("./routes/conversation");
const msgRoute = require("./routes/message");

const cors = require("cors");
const multer = require("multer");
const path = require("path");

const PORT = process.env.port;
const ATLAS = process.env.ATLAS;

const dbName = ATLAS.split("/")[3];

mongoose
  .connect(ATLAS, { useNewUrlParser: true })
  .then(() => console.log(`${dbName} db is online`))
  .catch((error) => {
    console.log("Error : ", error);
  });

app.use(
  cors({
    origin: ["http://localhost:3000"],
  })
);

app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use(express.json());
app.use(helment.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    const fileName = req.body.name;
    cb(null, fileName);
  },
});
const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploaded successfully");
  } catch (error) {
    console.log(error);
  }
});


app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/conv", convRoute);
app.use("/api/msg", msgRoute);

app.listen(PORT, () => {
  console.log(`Backend server is running PORT : ${PORT}`);
});

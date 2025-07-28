require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");

const carsRoute = require("./Routes/carsRoute");
const authRoutes = require("./Routes/authRoutes");
const database = require("./Database/database");

const app = express();

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);
      return callback(null, true); // Accept all origins dynamically
    },
    credentials: true, // Allow cookies and Authorization headers
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./tmp/",
  })
);

app.get("/", (req, res) => {
  res.send("app is set successfully");
});

app.use("/api", carsRoute);
app.use("/api", authRoutes);

module.exports = app;

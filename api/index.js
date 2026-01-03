const express = require("express");
const connectDB = require("../lib/db");

const app = express();
app.use(express.json());

let isConnected = false;
app.use(async (req, res, next) => {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
  }
  next();
});

app.get("/", (req, res) => {
  res.json({ status: "API working" });
});

module.exports = app;

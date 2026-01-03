const express = require("express");
const connectDB = require("../lib/db");

const app = express();

app.use(express.json());

// connect DB once
let isConnected = false;
app.use(async (req, res, next) => {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
  }
  next();
});

// routes
app.use("/api/auth", require("./auth"));
app.use("/api/user", require("./user"));
app.use("/api/digest", require("./digest"));
app.use("/api/cron", require("./cron"));

module.exports = app;


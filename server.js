require("dotenv").config();
const express = require("express");
const connectDB = require("./lib/db");
const auth = require("./lib/auth");

const app = express();
app.use(express.json());

// Connect DB once
connectDB();

// AUTH
app.post("/api/auth/register", require("./api/auth/register"));
app.post("/api/auth/login", require("./api/auth/login"));

// USER
app.get("/api/user/profile", require("./api/user/profile"));
app.put("/api/user/topics", auth,require("./api/user/topics"));

// DIGEST
app.post("/api/digest/sendManual",auth, require("./api/digest/sendManual"));



app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});

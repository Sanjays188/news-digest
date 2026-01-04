const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Cron route working ✅");
});

module.exports = router;

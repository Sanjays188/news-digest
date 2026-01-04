const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Digest route working ✅");
});

module.exports = router;

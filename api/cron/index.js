const express = require("express");
const router = express.Router();
const User = require("../../models/User");

router.get("/daily", async (req, res) => {
  try {
    const users = await User.find({ isSubscribed: true });

    return res.json({
      message: "Cron triggered successfully ✅",
      totalUsers: users.length
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Cron failed" });
  }
});

module.exports = router;

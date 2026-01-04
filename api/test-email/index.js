const express = require("express");
const router = express.Router();
const sendEmail = require("../../lib/email");

router.get("/", async (req, res) => {
  try {
    await sendEmail(
      "sanjays100111@gmail.com",
      "Test Email from Vercel",
      "<h1>Email working 🎉</h1>"
    );

    res.send("Test email sent successfully ✅");
  } catch (err) {
    console.error("EMAIL ERROR:", err?.response?.body || err.message || err);
    res.status(500).json({
      message: "Email failed ❌",
      error: err?.response?.body || err.message || err
    });
  }
});

module.exports = router;

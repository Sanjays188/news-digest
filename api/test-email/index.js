const express = require("express");
const router = express.Router();
const sendEmail = require("../../lib/email");

router.get("/", async (req, res) => {
  try {
    await sendEmail(
      "sanjays100111@gmail.com",
      "Test Email from Vercel",
      "<h1>Email working 🎉</h1><p>If you see this, Brevo is configured correctly.</p>"
    );

    res.send("Test email sent successfully ✅");
  } catch (err) {
    console.error(err);
    res.status(500).send("Email failed ❌");
  }
});

module.exports = router;

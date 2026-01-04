const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const fetchNews = require("../../lib/news");
const sendEmail = require("../../lib/email");

router.get("/daily", async (req, res) => {
  try {
    const users = await User.find({ isSubscribed: true });

    for (const user of users) {
      if (!user.topics.length) continue;

      let html = `<h2>Your Daily News Digest</h2>`;

      for (const topic of user.topics) {
        const articles = await fetchNews(topic);
        if (!articles.length) continue;

        html += `<h3>${topic.toUpperCase()}</h3><ul>`;
        articles.forEach(a => {
          html += `<li><a href="${a.url}">${a.title}</a></li>`;
        });
        html += `</ul>`;
      }

      await sendEmail(user.email, "📰 Your Daily News Digest", html);
    }

    res.json({ message: "Daily news emails sent successfully ✅" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Cron failed" });
  }
});

module.exports = router;


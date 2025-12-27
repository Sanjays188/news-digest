const connectDB = require("../../lib/db");
const User = require("../../models/User");
const fetchNewsForTopics = require("../../lib/news");
const sendEmail = require("../../lib/mail");

module.exports = async (req, res) => {
  try {
    await connectDB();

    const userId = req.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.topics || user.topics.length === 0) {
      return res.status(400).json({ message: "No topics selected" });
    }

    const newsDigest = await fetchNewsForTopics(user.topics);

    let html = `<h2>Hello 👋</h2>`;
    html += `<p>Here is your personalized news digest:</p>`;

    for (let topic in newsDigest) {
      html += `<h3>${topic.toUpperCase()}</h3><ul>`;
      newsDigest[topic].forEach(article => {
        html += `<li><a href="${article.url}">${article.title}</a></li>`;
      });
      html += `</ul>`;
    }

    await sendEmail({
      toEmail: user.email, // sends to logged-in user
      subject: "Your Personalized News Digest",
      htmlContent: "<h2>Your news digest is ready 🚀</h2>",
    });

    res.json({ message: "News digest email sent successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

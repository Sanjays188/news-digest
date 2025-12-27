const connectDB = require("../../lib/db");
const User = require("../../models/User");
const fetchNewsForTopics = require("../../lib/news");
const sendEmail = require("../../lib/mail");

module.exports = async (req, res) => {
  try {
    await connectDB();

    const users = await User.find({ isSubscribed: true });

    for (const user of users) {
      if (!user.topics || user.topics.length === 0) continue;

      const newsDigest = await fetchNewsForTopics(user.topics);

      await sendEmail(user.email, newsDigest);
    }

    res.status(200).json({ message: "Daily digest sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Cron job failed" });
  }
};

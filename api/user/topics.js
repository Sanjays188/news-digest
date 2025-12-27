const connectDB = require("../../lib/db");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
  try {
    await connectDB();

    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const { topics } = req.body;

    if (!topics || topics.length === 0) {
      return res.status(400).json({ message: "No topics selected" });
    }

    const user = await User.findByIdAndUpdate(
      decoded.userId,
      { topics },
      { new: true }
    );

    res.json({
      message: "Topics updated successfully",
      topics: user.topics,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

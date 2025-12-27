const axios = require("axios");

const fetchNewsByTopic = async (topic) => {
  try {
    const url = `https://newsapi.org/v2/everything?q=${topic}&pageSize=3&apiKey=${process.env.NEWS_API_KEY}`;

    const response = await axios.get(url);

    return response.data.articles;
  } catch (error) {
    console.error("News API error:", error.message);
    return [];
  }
};

module.exports = fetchNewsByTopic;

const axios = require("axios");

async function fetchNews(topic) {
  const url = `https://newsapi.org/v2/everything?q=${topic}&pageSize=3&apiKey=${process.env.NEWS_API_KEY}`;
  const response = await axios.get(url);
  return response.data.articles || [];
}

module.exports = fetchNews;

const axios = require("axios");

class NewsController {
  static async getNews(req, res, next) {
    try {
      const { data } = await axios.get(
        `https://newsapi.org/v2/everything?q=finance OR economy OR investment&language=en&pageSize=20&sortBy=popularity&apiKey=${process.env.NEWS_API_KEY}`,
      );

      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = NewsController;

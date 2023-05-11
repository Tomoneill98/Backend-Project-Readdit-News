const connection = require("../db/connection");
const fs = require("fs/promises");

exports.fetchTopicsData = () => {
  return connection.query(`SELECT * FROM topics;`).then((result) => {
    return result.rows;
  });
};

exports.fetchAPIsData = () => {
  return fs.readFile("endpoints.json", "utf-8").then((result) => {
    return JSON.parse(result);
  });
};


exports.fetchArticles = () => {
  return connection
    .query(
      `SELECT articles.article_id, articles.title, articles.author, articles.topic, articles.created_at, articles.votes, articles.article_img_url, COUNT(comment_id) AS comment_count FROM articles LEFT JOIN comments ON comments.article_id = articles.article_id
      GROUP BY articles.article_id
      ORDER BY articles.created_at DESC;`
    )
    .then((result) => {
      return result.rows;

exports.fetchArticlesById = (article_id) => {
  return connection
    .query(`SELECT * FROM articles WHERE article_id = $1;`, [article_id])
    .then((result) => {
      if (result.rows.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "Error - invalid article ID",
        });
      }
      return result.rows[0];

    });
};

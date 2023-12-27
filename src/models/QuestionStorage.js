const db = require("../config/db");

class QuestionStorage {
  static getReplyed() {
    return new Promise((reslove, reject) => {
      const query =
        "SELECT q.idx, q.questioner, q.content, q.dt 'qdt', a.answer, a.dt 'adt' FROM questions q JOIN answers a ON q.idx = a.question ORDER BY q.idx DESC";
      db.query(query, (err, data) => {
        if (err) reject(`${err}`);
        reslove(data);
      });
    });
  }

  static getNew() {
    return new Promise((reslove, reject) => {
      const query =
        "SELECT q.idx, q.questioner, q.content, q.dt FROM questions q LEFT JOIN answers a ON q.idx = a.question WHERE a.idx IS NULL ORDER BY q.idx DESC";
      db.query(query, (err, data) => {
        if (err) reject(`${err}`);
        reslove(data);
      });
    });
  }

  static async saveQuestion(client) {
    return new Promise((resolve, reject) => {
      const query =
        "INSERT INTO questions VALUES (NULL, '익명', 1, ?, 'W', NULL)";
      db.query(query, [client.content], (err) => {
        if (err) reject(`${err}`);
        resolve({ success: true });
      });
    });
  }

  static async saveAnswer(client) {
    return new Promise((resolve, reject) => {
      const query = "INSERT INTO answers VALUES (NULL, ?, ?, NULL)";
      db.query(query, [client.question, client.answer], (err) => {
        if (err) reject(`${err}`);
        resolve({ success: true });
      });
    });
  }
}

module.exports = QuestionStorage;

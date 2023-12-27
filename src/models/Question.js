const QuestionStorage = require("./QuestionStorage");

class Question {
  constructor(req) {
    this.req = req;
  }

  async getReplyed() {
    try {
      const data = await QuestionStorage.getReplyed();
      return { success: true, data };
    } catch (err) {
      return { success: false };
    }
  }

  async getNew() {
    try {
      const data = await QuestionStorage.getNew();
      return { success: true, data };
    } catch (err) {
      return { success: false, err };
    }
  }

  async saveQuestion() {
    try {
      const response = await QuestionStorage.saveQuestion(this.req);
      return response;
    } catch (err) {
      console.log(err);
      return { success: false };
    }
  }

  async saveAnswer() {
    try {
      const response = await QuestionStorage.saveAnswer(this.req);
      return response;
    } catch (err) {
      console.log(err);
      return { success: false };
    }
  }
}

module.exports = Question;

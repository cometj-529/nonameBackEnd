const Question = require("../../models/Question");
const User = require("../../models/User");

const output = {
  getSession: (req, res) => {
    if (req.session.Uid) {
      return res.json({ success: true });
    } else {
      return res.json({ success: false });
    }
  },

  replyed: async (req, res) => {
    const question = new Question();
    const resp = await question.getReplyed();

    return res.json(resp);
  },

  newQuestion: async (req, res) => {
    if (!req.session.Uid) {
      return res.send(`
        alert("안돼요");
        window.location.href = "/";
      `);
    }

    const question = new Question();
    const resp = await question.getNew();

    return res.json(resp);
  },

  logout: (req, res) => {
    req.session.detory(() => {
      res.redirect("/");
    });
  },
};

const process = {
  login: async (req, res) => {
    const user = new User(req.body);
    const resp = await user.login();

    if (resp.success) {
      req.session.Uname = resp.name;
      req.session.Uid = resp.id;
    }

    return res.json(resp);
  },

  register: async (req, res) => {
    const user = new User(req.body);
    const resp = await user.register();

    return res.json(resp);
  },

  saveQuestion: async (req, res) => {
    const question = new Question(req.body);
    const resp = await question.saveQuestion();

    return res.json(resp);
  },

  saveAnswer: async (req, res) => {
    const question = new Question(req.body);
    const resp = await question.saveAnswer();

    return res.json(resp);
  },
};

module.exports = {
  output,
  process,
};

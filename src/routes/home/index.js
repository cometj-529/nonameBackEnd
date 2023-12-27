const express = require("express");
const router = express.Router();
const ctrl = require("./home.ctrl");

router.get("/api/session", ctrl.output.getSession);
router.get("/api/replyed", ctrl.output.replyed);
router.get("/api/newQuestion", ctrl.output.newQuestion);
router.get("/logout", ctrl.output.logout);

router.post("/login", ctrl.process.login);
router.post("/register", ctrl.process.register);
router.post("/saveQuestion", ctrl.process.saveQuestion);
router.post("/saveAnswer", ctrl.process.saveAnswer);

module.exports = router;

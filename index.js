const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const home = require(__dirname + "/src/routes/home");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const cors = require("cors");
require("dotenv").config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

const sessionStore = new MySQLStore({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
    },
    store: sessionStore,
    name: "session_id",
  })
);

app.use("/", home);

module.exports = app;

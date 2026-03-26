require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./routes");
const passport = require("./config/passport");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());

app.use(router);

module.exports = app;

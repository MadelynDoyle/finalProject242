const express = require("express");
const bodyParser = require("body-parser");
const startMongo = require("./db");
const Joi = require("joi");
const app = express();
app.use(bodyParser.json());
app.use(express.static("public"));
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("./user");
let currentUser;

startMongo();

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

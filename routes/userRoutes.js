const express = require("express");
const Router = express.Router();

const { login, loginPage } = require("../controllers/userController.js");
const notFound = require("../middlewares/notFound.js");


Router.get("/", loginPage);

Router.post("/", login);

module.exports = Router;
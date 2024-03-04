const express = require("express");
const Router = express.Router();

const { signupPage, signup} = require("../controllers/userController.js");
const notFound = require("../middlewares/notFound.js");



Router.get("/", signupPage);

Router.post("/", signup);

module.exports = Router;
const express = require("express");
const Router = express.Router();
const fs = require("fs");
const { add, update, remove, allPosts } = require("../controllers/postController.js");
const notFound = require("../middlewares/notFound.js");

const { error } = require("console");

Router.route("/").get(allPosts).post(add);

Router.route("/:id").put(update).delete(remove);


Router.use(notFound);


module.exports = Router;

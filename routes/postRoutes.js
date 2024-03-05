const express = require("express");
const Router = express.Router();
const { add, update, remove, allPosts } = require("../controllers/postController.js");
const notFound = require("../middlewares/notFound.js");
const tokenVrf = require("../middlewares/tokenVrf.js");

const { error } = require("console");

Router.route("/").get(tokenVrf,allPosts).post(tokenVrf,add);

Router.route("/:id").put(tokenVrf,update).delete(tokenVrf,remove);


Router.use(notFound);


module.exports = Router;

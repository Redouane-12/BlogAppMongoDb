const mongoose = require("mongoose");

const schema = mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, default: "" },
    author:{type: mongoose.Schema.Types.ObjectId,ref:"users" }
  },
  {
    timestamps: true,
  },
);

const Post = mongoose.model("Post", schema);

module.exports = Post;
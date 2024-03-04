const Post = require("../models/postModel");


async function allPosts(req, res) {
  const posts = await Post.find();

  let output = "<h1>ALL POSTS</h1>\n";
  posts.forEach((post) => {
    output += `<p> <h3> ${post.title} </h3> <strong> content of post :   </strong>${post.content}</p> \n <strong>PostId :</strong>${post._id} <hr>`;
  });

  return res.send(output);
}


async function profile(req, res) {
  console.log("i am in profile");
  const user = await getUser(req.userEmail);
  res.send(user);
}

async function add(req, res) {
  try {
    const newPost = new Post({
      title: req.body.title,
      content: req.body.content,
    });

    newPost
      .save()
      .then(() => {
        res.send("Post added succesfully");
      })
      .catch((err) => {
        res.send(err.message);
      });
  } catch {
    res.status(401).json({ msg: "You are not logged in" });
  }
}

async function update(req, res) {
  const { id } = req.params;
  const { title, content } = req.body;
  Post.findOneAndUpdate(
    { _id: id},
    {
      $set: {
        title: title,
        content: content,
      },
    },
  )
    .then((post) => {
      res.send("post Updated! " + post._id);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send("Cannot Update this  post!");
    });
}

async function remove(req, res) {
  const { id } = req.params;

  Post.findOneAndDelete({ _id: id})
    .then((post) => {
      if (post) {
        return res.send("post deleted! id: " + post._id);
      }

      return res.status(400).send("Cannot delete this  post!");
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send(err.message);
    });
}

module.exports = { add, update, remove, profile, allPosts };
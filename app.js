const express = require("express");
const app = express();
require("./src/config")

const host = "localhost";
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.set('view engine','ejs');

const postRouter = require("./routes/postRoutes");
const userRouter = require("./routes/userRoutes");
const registerRouter = require("./routes/registerRoutes");
const {profile} = require("./controllers/postController.js");


app.use("/posts", postRouter);
app.use("/signup", registerRouter);
app.use("/login", userRouter);


app.get("/", (req, res) => {
  res.send("message : Go to /login");
});
app.get("/profile",profile);


app.listen(port, () => {
  console.log(`Server is running on http://${host}:${port}`);
});

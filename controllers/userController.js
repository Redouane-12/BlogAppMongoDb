const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const secret_key = "2g0j0w091u9w37";

function signupPage(req, res) {
    res.render("signup");
}

async function signup(req, res) {
    const existUser = await User.findOne({name: req.body.name});
    if(existUser){
        res.send("User already exist.");
    }else {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds)

        req.body.password = hashedPassword;

        const userData = await User.insertMany(req.body);
        console.log(userData);
        res.redirect("/login")
    }
}

function loginPage(req, res) {
    res.render("login");
}

async function login(req, res) {
    try{
        const check = await User.findOne({name: req.body.name});
        if(!check){
            return res.send("User cannot found");
        }

        const passwordMatch = await bcrypt.compare(req.body.password, check.password)
        if(!passwordMatch){
            return res.send("Wrong password")
        }
        const btkn = jwt.sign({ userId: check._id }, secret_key, {expiresIn: "20000s"});
        let token = "Bearer " + btkn;
        res.send(token);

    }catch{
        res.send("wrong Details!!!")    
    }
};



module.exports = {signupPage, signup, loginPage, login}



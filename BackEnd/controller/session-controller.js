const fs = require("fs");

function login(req, res) {
    let logInPage = fs.readFileSync("./views/login.html");
    res.write(logInPage);
    // res.write("login yo");
    res.end();
}

function signup(req, res) {
    let signUpPage = fs.readFileSync("./views/signup.html");
    res.write(signUpPage);
    // res.write("signup yo");
    res.end();
}

function saveuser(req, res) {

    res.json({
        msg: "user saved",
        status: 200,
        data: req.body,
    })

    // console.log(req.body);
    // res.write("user saved");
    // res.end();
}

module.exports.login = login
module.exports.signup = signup
module.exports.saveuser = saveuser
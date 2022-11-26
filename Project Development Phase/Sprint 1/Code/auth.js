const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//---SIGN UP
exports.signUp = async (req, res) => {
  //Checking if user already exist
  const existEmail = await checkIfUserExist(req.body.email);

  //Check is account method is google
  if (existEmail) {
    if (req.body.accountMethod === "Google") {
      //redirect to sign in
      return this.signIn(req, res);
    } else {
      return res.status(500).send("Email already exist");
    }
  }

  const salt = await bcrypt.genSalt(10);
  let hashedPassword = null;
  let user = null;
  if (req.body.accountMethod === "Google") {
    //Hashing Password
    hashedPassword = await bcrypt.hash("signedByGoogle", salt);
    //Registering new user
    user = new User({
      email: req.body.email,
      username: req.body.username,
      password: hashedPassword,
      accountMethod: req.body.accountMethod,
    });

    console.log("by google");
  } else {
    //Hashing Password
    hashedPassword = await bcrypt.hash(req.body.password, salt);
    //Registering new user
    user = new User({
      email: req.body.email,
      username: req.body.username,
      password: hashedPassword,
    });
    console.log("not by google");
  }
  console.log(hashedPassword);
  console.log(user);

  user
    .save()
    .then(() => {
      const token = jwt.sign(
        {
          _id: user._id,
          username: user.username,
          email: user.email,
          accountMethod: user.accountMethod,
        },
        process.env.SECRET_TOKEN
      );
      res.header("auth-token", token).send(token);
    })
    .catch((err) => res.status(500).send(err));
};

//---SIGN IN
exports.signIn = async (req, res) => {
  //Checking if user exist
  console.log(req.body);
  const user = await checkIfUserExist(req.body.email);
  if (!user) return res.status(500).send("Email not exist");

  let validPassword = null;
  if (req.body.accountMethod === "Google") {
    //Checking if password is correct
    validPassword = await bcrypt.compare("signedByGoogle", user.password);
  } else {
    //Checking if password is correct
    validPassword = await bcrypt.compare(req.body.password, user.password);
  }

  if (!validPassword) return res.status(500).send("Invalid Password");

  //Create and assign a token
  const token = jwt.sign(
    {
      _id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
      accountMethod: user.accountMethod,
    },
    process.env.SECRET_TOKEN
  );
  return res.header("auth-token", token).send(token);
};

//---RESET PASSWORD
exports.resetPassword = async (req, res) => {
  console.log(req.body);
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  const user = await User.findOneAndUpdate(
    { email: req.body.email },
    { password: hashedPassword }
  );
  if (user) {
    return res.status(200).send("New Password is updated");
  } else {
    return res.status(500).send("Email is not valid");
  }
};

exports.authUser = async (req, res) => {
  const user = await checkIfUserExist(req.params.email);
  console.log(user);
  if (user) {
    return res.status(200).send("Continue");
  } else {
    return res.status(200).send("No user found");
  }
};

exports.updateUsername = async (req, res) => {
  User.findByIdAndUpdate(req.body._id, { username: req.body.username }).then(
    (user) => {
      const token = jwt.sign(
        { _id: user._id, username: user.username, email: user.email },
        process.env.SECRET_TOKEN
      );
      res.header("auth-token", token).send(token);
    }
  );
};

const checkIfUserExist = async (email) => {
  const user = await User.findOne({ email });
  return user;
};

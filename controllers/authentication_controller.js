const User = require("../models/user");
const jwt = require("jwt-simple");
const config = require("../config");

const tokenForUser = async (user) => {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user._id, iat: timestamp }, config.secret);
};

exports.signin = async (req, res, next) => {
  const user = req.user;
  try {
    const token = await tokenForUser(user);
    res.send({ token, user_id: user._id });
  } catch (error) {
    next(error);
  }
};

exports.signup = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(422)
      .json({ error: "Please provide your email and password" });
  }
  const existingUser = await User.findOne({ email: email });
  if (existingUser) {
    return res.status(422).json({ error: "Email already in use" });
  }
  const user = new User({ email, password });
  user.save().then((savedUser) => res.json({ user_id: savedUser._id, token: tokenForUser(savedUser) })
    )
    .catch((error) => next(error));
};

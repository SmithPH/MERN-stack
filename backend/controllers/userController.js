const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");

require("dotenv").config();

// #########################################################
// AUTHENTICATION   JWT  TOKEN
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "10d" });
};

// #########################################################
// REGISTER USER
const registerUser = async (req, res) => {
  // grab data from request body
  const { email, password } = req.body;

  // check the fields are not empty
  if (!email || !password) {
    return res.status(400).json({ error: "All fields are required." });
  }

  // check if email already exist
  const exist = await User.findOne({ email });
  if (exist) {
    return res.status(400).json({ error: "This email is already registered" });
  }

  // hash the password
  const salt = await bcrypt.genSalt(); // default is 10
  const hashed = await bcrypt.hash(password, salt);

  try {
    // REGISTER USER
    const user = await User.create({ email, password: hashed });

    // FOR AUTHENTICATION -> CREATE THE JsonWebToken
    const token = createToken(user._id); // _id is from mongoDB

    // SEND THE RESPONSE
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// #########################################################
// LOGIN USER
const loginUser = async (req, res) => {
  // grab data from request body
  const { email, password } = req.body;

  // check the fields are not empty
  if (!email || !password) {
    return res.status(400).json({ error: "All fields are required." });
  }

  // check if email is not exist
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ error: "Incorrect email" });
  }

  // check password
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(400).json({ error: "Incorrect password" });
  }

  try {
    // FOR AUTHENTICATION -> CREATE THE JsonWebToken
    const token = createToken(user._id); // _id is from mongoDB

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
};

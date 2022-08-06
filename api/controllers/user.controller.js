const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const { sendError, STUDENT } = require("../utils/utils");
require("dotenv").config();

exports.createUser = async (req, res) => {
  let { name, email, password, role } = req.body;
  if (!role) role = STUDENT;

  try {
    const newUser = new User({ name, email, password, role });
    await newUser.save();
    return res.status(201).json({
      message: "User Created Successfully!",
      error: false,
    });
  } catch (error) {
    return sendError(res, error.message);
  }
};

exports.signIn = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return sendError(res, "Invalid userId!");

  const matched = await user.comparePassword(password);
  if (!matched) return sendError(res, "Invalid password!");

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
  return res.json({
    error: false,
    jwtToken: token,
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
  });
};

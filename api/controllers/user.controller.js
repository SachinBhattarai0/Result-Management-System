const User = require("../models/user.model");
const Student = require("../models/student.model");
const jwt = require("jsonwebtoken");
const { sendError, TEACHER } = require("../utils/utils");
const mongoose = require("mongoose");
require("dotenv").config();

console.log("create admin");

exports.createTeacher = async (req, res) => {
  let { name, email, password } = req.body;
  let role = TEACHER;

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

exports.createStudent = async (req, res) => {
  const { nameList, class: _class, subjects } = req.body;

  const studentList = nameList.map((name, i) => {
    return { name, class: _class, subjects, rollNo: i + 1 };
  });

  try {
    await Student.insertMany(studentList);
  } catch (error) {
    return sendError(res, error.message);
  }

  return res
    .status(201)
    .json({ error: false, message: "Students created Successfully!" });
};

exports.verify = (req, res) => {
  const user = req.user;
  if (user)
    return res.json({
      error: false,
      message: "User Validated Successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  return res.sendError(res, "User Validaton failed", 401);
};

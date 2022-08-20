const Student = require("../models/student.model");
const mongoose = require("mongoose");
const { paginator } = require("../utils/utils");
const { sendError } = require("../utils/utils");
const { TEACHER } = require("../utils/utils");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
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
      teacher: { name: newUser.name, email: newUser.email },
    });
  } catch (error) {
    return sendError(res, error.message);
  }
};

exports.updateTeacher = async (req, res) => {
  const { name, email, password, id } = req.body;

  try {
    await User.findOneAndUpdate({ _id: id }, { name, email });

    if (password) {
      const teacher = await User.findById(id);
      teacher.password = password;
      await teacher.save();
    }
  } catch (error) {
    return sendError(res, error.message);
  }

  return res.json({ error: false, message: "User updated successfully!!" });
};

exports.deleteTeacher = async (req, res) => {
  const { id } = req.body;

  try {
    const teacher = await User.findById(id);
    if (!teacher) return sendError(res, "teacher id is invalid!!");

    await teacher.delete();
    const newTeacherList = await User.find({ role: "teacher" }).lean();
    return res.json({
      error: false,
      message: "Teacher deleted successfully!!",
      teacherList: newTeacherList,
    });
  } catch (error) {
    return sendError(res, error.message);
  }
};

exports.getAllTeachers = async (req, res) => {
  const teachers = await User.find({ role: TEACHER }).lean();

  const currentPage = parseInt(req.query.page) || 1;
  const NoOfItemsPerPage = 30;
  const { paginatedList, pager } = paginator(
    teachers,
    NoOfItemsPerPage,
    currentPage
  );

  res.json({ error: false, pager, teachers: paginatedList });
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

exports.updatePassword = async (req, res) => {
  const { userId, currentPassword, newPassword } = req.body;

  const user = await User.findById(userId);
  if (!user) return sendError(res, "Invalid userId!");

  const matched = await user.comparePassword(currentPassword);
  if (!matched) return sendError(res, "Invalid pasword!!");

  try {
    user.password = newPassword;
    user.save();
  } catch (error) {
    return sendError(res, "Some Error Occured");
  }

  return res.json({ error: false, message: "Password update successful!!" });
};

exports.createStudent = async (req, res) => {
  const { studentNames, class: _class, subjects } = req.body;

  const session = await mongoose.startSession();

  const transactionRes = await session.withTransaction(async () => {
    const stdCount = await Student.count({ class: _class });

    for (i = 0; i < studentNames.length; i++) {
      const name = studentNames[i];
      const rollNo = stdCount + i + 1;
      const newStd = new Student({ name, class: _class, subjects, rollNo });

      try {
        await newStd.save({ session });
      } catch (error) {
        await session.abortTransaction();
        return sendError(res, error.message);
      }
    }
  });

  if (transactionRes) await session.commitTransaction();
  await session.endSession();

  const stdList = await Student.find({ class: _class, passed: false }).sort({
    name: 1,
  });
  //sorting rollNo alphabetically
  stdList.forEach(async (s, i) => {
    await s.updateOne({ rollNo: i + 1 });
  });

  if (transactionRes)
    return res
      .status(201)
      .json({ error: false, message: "Students created Successfully!" });
};

exports.updateStudent = async (req, res) => {
  const { name, class: _class, subjects, passed, id } = req.body;

  try {
    const student = await Student.findOneAndUpdate(
      { _id: id },
      { name, class: _class, subjects, passed }
    );
    if (!student) return sendError(res, "Could not update!!");
  } catch (error) {
    return sendError(res, error.message);
  }

  res.json({ error: false, message: "Student updated successfully!!" });
};

exports.deleteStudent = async (req, res) => {
  const { id } = req.body;

  try {
    const student = await Student.findById(id);
    if (!student) return sendError(res, "Student id is invalid!!");
    await student.delete();

    const newStudentList = await Student.find({})
      .populate("class")
      .populate("subjects")
      .lean()
      .sort({ rollNo: 1 });

    return res.json({
      error: false,
      message: "Student deleted successfully!!",
      studentList: newStudentList,
    });
  } catch (error) {
    return sendError(res, error.message);
  }
};

exports.getAllStudents = async (req, res) => {
  const students = await Student.find()
    .populate("class")
    .populate("subjects")
    .sort({ rollNo: 1 })
    .lean();

  const currentPage = parseInt(req.query.page) || 1;
  const NoOfItemsPerPage = 50;
  const { paginatedList, pager } = paginator(
    students,
    NoOfItemsPerPage,
    currentPage
  );

  return res.json({ error: false, pager, students: paginatedList });
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

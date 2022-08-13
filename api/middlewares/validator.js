const { check, validationResult } = require("express-validator");
const { isValidObjectId } = require("mongoose");
const { sendError, TEACHER } = require("../utils/utils");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const Exam = require("../models/exam.model");
const Subject = require("../models/subject.model");
const Assignment = require("../models/assignment.model");
const Class = require("../models/class.model");
require("dotenv").config();

exports.validate = (req, res, next) => {
  const error = validationResult(req).errors[0];
  if (error) return sendError(res, error.msg);
  next();
};

exports.userInfoValidator = [
  check("name").trim().not().isEmpty().withMessage("Name is missing!!"),
  check("email").trim().not().isEmpty().withMessage("Email is missing!"),
  check("email").trim().isEmail().withMessage("Email is invalid!"),
  check("password").not().isEmpty().withMessage("Password cannot be empty!"),
  check("password")
    .isLength({ min: 8, max: 20 })
    .withMessage("Password must be at least 8 and max 20 character long!"),
];

exports.assignmentValidator = [
  check("user").trim().not().isEmpty().withMessage("User is required!"),
  check("exam").trim().not().isEmpty().withMessage("Exam is required!"),
  check("subject").trim().not().isEmpty().withMessage("Subject is required!"),
  check("class").trim().not().isEmpty().withMessage("Class is required!"),
  check("user").custom(async (id, { req }) => {
    if (!isValidObjectId(id)) throw new Error("Invalid userId");
    const userItem = await User.findById(req.body.user)
      .lean()
      .select("name role");

    if (!userItem) throw new Error("Invalid userId!");
    if (userItem.role !== TEACHER)
      throw new Error("Asignments can only be given to teachers");

    req.user = userItem;
    return true;
  }),
  check("exam").custom(async (id, { req }) => {
    if (!isValidObjectId(id)) throw new Error("Invalid examId");
    const examItem = await Exam.findById(req.body.exam).lean();

    if (!examItem) throw new Error("Invalid examId");

    req.exam = examItem;
    return true;
  }),
  check("subject").custom(async (id, { req }) => {
    if (!isValidObjectId(id)) throw new Error("Invalid subjectId");
    const subjectItem = await Subject.findById(req.body.subject).lean();

    if (!subjectItem) throw new Error("Invalid subjectId");

    req.subject = subjectItem;
    return true;
  }),
  check("class").custom(async (id, { req }) => {
    if (!isValidObjectId(id)) throw new Error("Invalid classId");
    const classItem = await Class.findById(req.body.class).lean();

    if (!classItem) throw new Error("Invalid classId");

    req.class = classItem;
    return true;
  }),
];

exports.subjectValidator = [
  check("name").trim().not().isEmpty().withMessage("Name is missing!"),
  check("class").isArray().withMessage("Class must be a array!"),
  check("class").custom((classArr) => {
    if (classArr.length === 0) throw new Error("Array cannot be empty!");

    const invalidIndex = classArr.findIndex((id) => isValidObjectId(id));
    if (invalidIndex < 0) throw new Error("Invalid classId!");
    return true;
  }),
];

exports.examValidator = [
  check("name").trim().not().isEmpty().withMessage("name is empty!"),
  check("year").trim().not().isEmpty().withMessage("year is empty!"),
  check("month").trim().not().isEmpty().withMessage("month is empty!"),
  check("date").trim().not().isEmpty().withMessage("date is empty!"),
];

exports.signInValidator = [
  check("email").trim().not().isEmpty().withMessage("email is empty!"),
  check("password").trim().not().isEmpty().withMessage("password is empty!"),
];

exports.studentInfoValidator = [
  check("class").not().isEmpty().withMessage("class is missing!"),
  check("subjects")
    .isArray({ min: 1 })
    .withMessage("subjects must be a array!"),
  check("subjects").custom((subjectArr) => {
    if (subjectArr.length === 0) throw new Error("Array cannot be empty!");

    const invalidIndex = subjectArr.findIndex((id) => isValidObjectId(id));
    if (invalidIndex < 0) throw new Error("Invalid classId!");
    return true;
  }),
  check("nameList")
    .isArray({ min: 1 })
    .withMessage("nameList must be a array!"),
  check("nameList").custom((list) => {
    list.forEach((name, i) => {
      if (!name) throw new Error("Empty student name!");
    });
    return true;
  }),
];

exports.markValidator = [
  check("marks").isArray({ min: 1 }).withMessage("marks must be array"),
  check("assignment").custom(async (id, { req }) => {
    if (!isValidObjectId(id)) throw new Error("Invalid assignmentId");
    const assignment = await Assignment.findById(id).populate("subject");

    if (!assignment || assignment.completed)
      throw new Error("Some error occured");

    req.assignment = assignment;
    return true;
  }),
  check("marks").custom((marks, { req }) => {
    const subject = req.assignment.subject;
    marks.forEach((mark, i) => {
      if (!mark.theoryMark || mark.theoryMark < 0)
        throw new Error(`Invalid theory mark ar index ${i + 1}`);
      if (!mark.practicalMark || mark.practicalMark < 0)
        throw new Error(`Invalid practical mark ar index ${i + 1}`);

      if (mark.theoryMark > subject.theoryMark)
        throw new Error(
          `Invalid theory mark at index ${i + 1}! must be less than ${
            subject.theoryMark
          }`
        );
      if (mark.practicalMark > subject.practicalMark)
        throw new Error(
          `Invalid practical mark at index ${i + 1}! must be less than ${
            subject.practicalMark
          }`
        );
    });
    return true;
  }),
];

exports.classAndExamsValidator = [
  check("class").trim().not().isEmpty().withMessage("class is requried!!"),
  check("exams")
    .isArray({ min: 1 })
    .withMessage("exams should be non empty array!!"),
];

exports.userValidator = async (req, res, next) => {
  const jwtToken = req.headers.authorization?.split(" ")[1];
  if (!jwtToken) return sendError(res, "jwtToken is not present!");

  try {
    const { userId } = await jwt.verify(jwtToken, process.env.JWT_SECRET);

    const user = await User.findById(userId).lean();
    if (!user) return sendError(res, "Invalid jwtToken!");

    req.user = user;
    next();
  } catch (error) {
    return sendError(res, error.message);
  }
};

exports.allowedRoles = (roles) => {
  if (!Array.isArray(roles)) roles = [roles];

  return (req, res, next) => {
    const user = req.user;
    if (!user) return sendError(res, "User is not validated!");

    if (!roles.includes(user.role))
      return sendError(res, "user is unauthorized", 401);
    next();
  };
};

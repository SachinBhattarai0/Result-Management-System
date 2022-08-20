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
    const subjectItem = await Subject.findById(req.body.subject)
      .populate("class")
      .lean();

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
  check("subject").custom((_, { req }) => {
    const index = req.subject.class.findIndex(
      (_class) => _class._id.toString() === req.class._id.toString()
    );
    if (index < 0) throw new Error("the subject is not made for the class!!");
    return true;
  }),
];

exports.subjectValidator = [
  check("name").trim().not().isEmpty().withMessage("Name is missing!"),
  check("classes")
    .isArray({ min: 1 })
    .withMessage("Class must be a non empty array!"),
  check("classes").custom(async (classArr, { req }) => {
    const classItems = [];

    classArr.forEach(async (id) => {
      if (!isValidObjectId(id)) throw new Error("invalid classIds");

      const classItem = await Class.findById(id).lean();
      if (!classItem) throw new Error("invalid classIds");
      classItems.push(classItem);
    });
    req.classItems = classItems;
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
  check("class")
    .trim()
    .not()
    .isEmpty()
    .custom((value) => {
      if (!isValidObjectId(value)) throw new Error("class is invalid");
      return true;
    }),
  check("subjects")
    .isArray({ min: 1 })
    .withMessage("subjects must be a array!"),
  check("subjects").custom((subjectArr) => {
    if (subjectArr.length === 0) throw new Error("Array cannot be empty!");

    const invalidIndex = subjectArr.findIndex((id) => isValidObjectId(id));
    if (invalidIndex < 0) throw new Error("Invalid classId!");
    return true;
  }),
  check("studentNames")
    .isArray({ min: 1 })
    .withMessage("studentNames must be a array!"),
  check("studentNames").custom((list) => {
    list.forEach((name, i) => {
      if (!name) throw new Error("Empty student name at index " + i);
    });
    return true;
  }),
];

exports.studentUpdateInfoValidator = [
  check("name").trim().not().isEmpty().withMessage("name is missing!!"),
  check("class").trim().not().isEmpty().withMessage("class is missing!"),
  check("id").trim().not().isEmpty().withMessage("id is missing!"),
  check("passed")
    .isBoolean()
    .withMessage("passed must be either true or false!!"),
  check("id")
    .trim()
    .not()
    .isEmpty()
    .custom((value) => {
      if (!isValidObjectId(value)) throw new Error("id is invalid");
      return true;
    }),
  check("class")
    .trim()
    .not()
    .isEmpty()
    .custom((value) => {
      if (!isValidObjectId(value)) throw new Error("class is invalid");
      return true;
    }),
  check("subjects")
    .isArray({ min: 1 })
    .withMessage("subjects must be a array!"),
  check("subjects").custom((subjectArr) => {
    if (subjectArr.length === 0) throw new Error("Array cannot be empty!");

    const invalidIndex = subjectArr.findIndex((id) => isValidObjectId(id));
    if (invalidIndex < 0) throw new Error("Invalid classId!");
    return true;
  }),
];

exports.markValidator = [
  check("marks").isArray({ min: 1 }).withMessage("marks must be array"),
  check("assignment").custom(async (id, { req }) => {
    if (!isValidObjectId(id)) throw new Error("Invalid assignmentId");
    const assignment = await Assignment.findById(id)
      .populate("subject")
      .populate("exam")
      .populate("class");

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

exports.passwordValidator = [
  check("currentPassword")
    .trim()
    .not()
    .isEmpty()
    .withMessage("currentPassword is missing!!"),
  check("newPassword")
    .trim()
    .not()
    .isEmpty()
    .withMessage("newPassword is missing!!"),
  check("confirmNewPassword")
    .trim()
    .not()
    .isEmpty()
    .withMessage("confirmNewPassword is missing!!"),
  check("newPassword")
    .isLength({ min: 8, max: 20 })
    .withMessage("Password must be at least 8 and max 20 character long!"),
  (req, res, next) => {
    const { currentPassword, newPassword, confirmNewPassword } = req.body;

    if (currentPassword === newPassword)
      return sendError(res, "New password cannot be old password!!");
    if (confirmNewPassword !== newPassword)
      return sendError(res, "password donot match!!");
    next();
  },
];

exports.teacherUpdateInfoValidator = [
  check("name").trim().not().isEmpty().withMessage("name cannot be empty!!"),
  check("email").trim().isEmail().withMessage("Invalid email type"),
  check("id").custom((id) => {
    if (!isValidObjectId(id)) throw new Error("invalid id!!");
    return true;
  }),
  check("password").custom((password) => {
    if (!password) return true;

    if (password.length < 8 || password.length > 20)
      throw new Error(
        "password must be greater than 8 and less than 20 characer long"
      );
    return true;
  }),
  check("email").custom(async (email) => {
    const user = await User.exists({ email });
    if (user) throw new Error("email already exists!!");
    return true;
  }),
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

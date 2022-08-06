const { check, validationResult } = require("express-validator");
const { isValidObjectId } = require("mongoose");
const { userRoles, sendError } = require("../utils/utils");

exports.validate = (req, res, next) => {
  const error = validationResult(req).errors[0];
  if (error) return sendError(res, error.msg);
  next();
};

exports.userValidator = [
  check("name").trim().not().isEmpty().withMessage("Name is missing!!"),
  check("email").trim().not().isEmpty().withMessage("Email is missing!"),
  check("email").trim().isEmail().withMessage("Email is invalid!"),
  check("role").custom((role) => {
    if (role && !userRoles.includes(role)) throw new Error("Invalid role");
    return true;
  }),
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
  check("user").custom((id) => {
    if (!isValidObjectId(id)) throw new Error("Invalid userId");
    return true;
  }),
  check("exam").custom((id) => {
    if (!isValidObjectId(id)) throw new Error("Invalid examId");
    return true;
  }),
  check("subject").custom((id) => {
    if (!isValidObjectId(id)) throw new Error("Invalid subjectId");
    return true;
  }),
  check("class").custom((id) => {
    if (!isValidObjectId(id)) throw new Error("Invalid classId");
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
  check("year").trim().not().isEmpty().withMessage("year is empty!"),
  check("month").trim().not().isEmpty().withMessage("month is empty!"),
  check("date").trim().not().isEmpty().withMessage("date is empty!"),
  check("year").not().isNumeric().withMessage("year must be a number!"),
  check("month").not().isNumeric().withMessage("month must be a number!"),
  check("date").not().isNumeric().withMessage("date must be a number!"),
];

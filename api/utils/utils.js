const STUDENT = "student";
const TEACHER = "teacher";
const ADMIN = "admin";

exports.STUDENT = STUDENT;
exports.TEACHER = TEACHER;
exports.ADMIN = ADMIN;

exports.userRoles = [STUDENT, TEACHER, ADMIN];

exports.emailValidatorRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

exports.sendError = (res, msg, code = 400) => {
  res.status(code).json({ error: true, message: msg });
};

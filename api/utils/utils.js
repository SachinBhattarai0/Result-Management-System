const TEACHER = "teacher";
const ADMIN = "admin";

exports.TEACHER = TEACHER;
exports.ADMIN = ADMIN;

exports.userRoles = [TEACHER, ADMIN];

exports.emailValidatorRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

exports.sendError = (res, msg, code = 400) => {
  res.status(code).json({ error: true, message: msg });
};

const { check, validationResult } = require("express-validator");
const { userRoles, sendError } = require("../utils/utils");

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

exports.validate = (req, res, next) => {
  const error = validationResult(req).errors[0];
  if (error) return sendError(res, error.msg);
  next();
};

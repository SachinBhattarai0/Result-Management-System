const { userValidator, allowedRoles } = require("../middlewares/validator");
const {
  createTeacher,
  createStudent,
  signIn,
  verify,
} = require("../controllers/user.controller");
const {
  userInfoValidator,
  studentInfoValidator,
  validate,
  signInValidator,
} = require("../middlewares/validator");
const router = require("express").Router();

router.post(
  "/create-teacher",
  userValidator,
  allowedRoles("admin"),
  userInfoValidator,
  validate,
  createTeacher
);

router.post(
  "/create-student",
  userValidator,
  allowedRoles("admin"),
  studentInfoValidator,
  validate,
  createStudent
);

router.post("/verify", userValidator, validate, verify);

router.post("/sign-in", signInValidator, validate, signIn);

module.exports = router;

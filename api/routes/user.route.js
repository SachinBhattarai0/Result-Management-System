const { userValidator } = require("../middlewares/validator");
const { allowedRoles } = require("../middlewares/validator");
const { userInfoValidator } = require("../middlewares/validator");
const { passwordValidator } = require("../middlewares/validator");
const { studentInfoValidator } = require("../middlewares/validator");
const { signInValidator } = require("../middlewares/validator");
const { createTeacher } = require("../controllers/user.controller");
const { updatePassword } = require("../controllers/user.controller");
const { createStudent } = require("../controllers/user.controller");
const { getAllTeachers } = require("../controllers/user.controller");
const { getAllStudents } = require("../controllers/user.controller");
const { signIn } = require("../controllers/user.controller");
const { verify } = require("../controllers/user.controller");
const { validate } = require("../middlewares/validator");

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
  "/update-password/",
  userValidator,
  allowedRoles(["admin", "teacher"]),
  passwordValidator,
  validate,
  updatePassword
);

router.post(
  "/get-teachers",
  userValidator,
  allowedRoles("admin"),
  getAllTeachers
);

router.post(
  "/create-student",
  userValidator,
  allowedRoles("admin"),
  studentInfoValidator,
  validate,
  createStudent
);

router.post(
  "/get-students",
  userValidator,
  allowedRoles("admin"),
  getAllStudents
);

router.post("/verify", userValidator, validate, verify);

router.post("/sign-in", signInValidator, validate, signIn);

module.exports = router;

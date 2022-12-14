const { signIn } = require("../controllers/user.controller");
const { verify } = require("../controllers/user.controller");
const { validate } = require("../middlewares/validator");
const { allowedRoles } = require("../middlewares/validator");
const { studentPrmoteInfoValidator } = require("../middlewares/validator");
const { userInfoValidator } = require("../middlewares/validator");
const { passwordValidator } = require("../middlewares/validator");
const { studentInfoValidator } = require("../middlewares/validator");
const { signInValidator } = require("../middlewares/validator");
const { promoteStudent } = require("../controllers/user.controller");
const { updatePassword } = require("../controllers/user.controller");
const { getAllTeachersPaginated } = require("../controllers/user.controller");
const { getAllStudentsPaginated } = require("../controllers/user.controller");
const { createStudent } = require("../controllers/user.controller");
const { getAllTeachers } = require("../controllers/user.controller");
const { userValidator } = require("../middlewares/validator");
const { studentUpdateInfoValidator } = require("../middlewares/validator");
const { teacherUpdateInfoValidator } = require("../middlewares/validator");
const { createTeacher } = require("../controllers/user.controller");
const { updateStudent } = require("../controllers/user.controller");
const { deleteStudent } = require("../controllers/user.controller");
const { updateTeacher } = require("../controllers/user.controller");
const { deleteTeacher } = require("../controllers/user.controller");

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
  "/update-teacher",
  userValidator,
  allowedRoles("admin"),
  teacherUpdateInfoValidator,
  validate,
  updateTeacher
);

router.post(
  "/delete-teacher",
  userValidator,
  allowedRoles("admin"),
  deleteTeacher
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
  "/get-all-teachers",
  userValidator,
  allowedRoles("admin"),
  getAllTeachers
);

router.post(
  "/get-teachers-paginated",
  userValidator,
  allowedRoles("admin"),
  getAllTeachersPaginated
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
  "/update-student",
  userValidator,
  allowedRoles("admin"),
  studentUpdateInfoValidator,
  validate,
  updateStudent
);

router.post(
  "/delete-student",
  userValidator,
  allowedRoles("admin"),
  deleteStudent
);

router.post(
  "/get-students-paginated",
  userValidator,
  allowedRoles("admin"),
  getAllStudentsPaginated
);

router.post(
  "/promote-student/",
  userValidator,
  allowedRoles("admin"),
  studentPrmoteInfoValidator,
  promoteStudent
);

router.post("/verify", userValidator, validate, verify);

router.post("/sign-in", signInValidator, validate, signIn);

module.exports = router;

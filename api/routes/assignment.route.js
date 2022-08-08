const router = require("express").Router();
const {
  createAssignment,
  getAssignmentList,
  getStudentList,
} = require("../controllers/assignment.controller");
const {
  assignmentValidator,
  validate,
  userValidator,
  allowedRoles,
} = require("../middlewares/validator");

router.post(
  "/create",
  userValidator,
  allowedRoles("admin"),
  assignmentValidator,
  validate,
  createAssignment
);

router.post(
  "/list/",
  userValidator,
  allowedRoles(["teacher"]),
  getAssignmentList
);

router.post(
  "/student-list/",
  userValidator,
  allowedRoles(["teacher"]),
  getStudentList
);

module.exports = router;

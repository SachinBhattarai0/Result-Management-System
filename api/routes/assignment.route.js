const router = require("express").Router();
const {
  createAssignment,
  getAssignmentListForUser,
  getStudentList,
  getAllAssignments,
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
  "/get-all",
  userValidator,
  allowedRoles("admin"),
  getAllAssignments
);

router.post(
  "/list/",
  userValidator,
  allowedRoles(["teacher"]),
  getAssignmentListForUser
);

router.post(
  "/student-list/",
  userValidator,
  allowedRoles(["teacher"]),
  getStudentList
);

module.exports = router;

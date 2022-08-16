const { getAllAssignments } = require("../controllers/assignment.controller");
const { getStudentList } = require("../controllers/assignment.controller");
const { createAssignment } = require("../controllers/assignment.controller");
const { assignmentValidator } = require("../middlewares/validator");
const { validate } = require("../middlewares/validator");
const { userValidator } = require("../middlewares/validator");
const { allowedRoles } = require("../middlewares/validator");
const {
  getAssignmentListForUser,
} = require("../controllers/assignment.controller");
const router = require("express").Router();

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

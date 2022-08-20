const { getAllAssignments } = require("../controllers/assignment.controller");
const { deleteAssignment } = require("../controllers/assignment.controller");
const { updateAssignment } = require("../controllers/assignment.controller");
const { getStudentList } = require("../controllers/assignment.controller");
const { createAssignment } = require("../controllers/assignment.controller");
const { assignmentCompletedValidator } = require("../middlewares/validator");
const { assignmentValidator } = require("../middlewares/validator");
const { validate } = require("../middlewares/validator");
const { userValidator } = require("../middlewares/validator");
const { allowedRoles } = require("../middlewares/validator");
const {
  getAllPaginatedAssignments,
} = require("../controllers/assignment.controller");
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
  "/update",
  userValidator,
  allowedRoles("admin"),
  assignmentValidator,
  assignmentCompletedValidator,
  validate,
  updateAssignment
);

router.post("/delete", userValidator, allowedRoles("admin"), deleteAssignment);

router.post(
  "/get-all",
  userValidator,
  allowedRoles("admin"),
  getAllAssignments
);

router.post(
  "/get-all-paginated",
  userValidator,
  allowedRoles("admin"),
  getAllPaginatedAssignments
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

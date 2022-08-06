const { createAssignment } = require("../controllers/assignment.controller");
const {
  assignmentValidator,
  validate,
  userValidator,
  allowedRoles,
} = require("../middlewares/validator");
const router = require("express").Router();

router.post(
  "/create",
  userValidator,
  allowedRoles("admin"),
  assignmentValidator,
  validate,
  createAssignment
);

module.exports = router;

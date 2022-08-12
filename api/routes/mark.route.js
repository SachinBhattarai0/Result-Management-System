const {
  userValidator,
  allowedRoles,
  validate,
  classAndExamsValidator,
  markValidator,
} = require("../middlewares/validator");
const {
  createMarks,
  getSudentsListForExam,
} = require("../controllers/mark.controller");
const router = require("express").Router();

router.post(
  "/create/",
  userValidator,
  allowedRoles(["admin", "teacher"]),
  markValidator,
  validate,
  createMarks
);

router.post(
  "/student-list-for-exam/",
  userValidator,
  allowedRoles(["admin"]),
  classAndExamsValidator,
  validate,
  getSudentsListForExam
);

module.exports = router;

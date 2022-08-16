const { getSudentsListForExam } = require("../controllers/mark.controller");
const { createMarks } = require("../controllers/mark.controller");
const { allowedRoles } = require("../middlewares/validator");
const { userValidator } = require("../middlewares/validator");
const { validate } = require("../middlewares/validator");
const { classAndExamsValidator } = require("../middlewares/validator");
const { markValidator } = require("../middlewares/validator");

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

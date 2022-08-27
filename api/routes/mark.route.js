const { validate } = require("../middlewares/validator");
const { updateMarks } = require("../controllers/mark.controller");
const { createMarks } = require("../controllers/mark.controller");
const { allowedRoles } = require("../middlewares/validator");
const { userValidator } = require("../middlewares/validator");
const { markValidator } = require("../middlewares/validator");
const { markUpdateInfoValidator } = require("../middlewares/validator");
const { classAndExamsValidator } = require("../middlewares/validator");
const { getSudentsListForExam } = require("../controllers/mark.controller");
const { getAllPaginatedMark } = require("../controllers/mark.controller");

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
  "/update-marks/",
  userValidator,
  allowedRoles(["admin"]),
  markUpdateInfoValidator,
  validate,
  updateMarks
);

router.post(
  "/student-list-for-exam/",
  userValidator,
  allowedRoles(["admin"]),
  classAndExamsValidator,
  validate,
  getSudentsListForExam
);

router.post(
  "/get-marks-paginated/",
  userValidator,
  allowedRoles(["admin"]),
  getAllPaginatedMark
);

module.exports = router;

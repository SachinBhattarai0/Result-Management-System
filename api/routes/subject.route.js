const {
  createSubject,
  getAllSubjects,
} = require("../controllers/subject.controller");
const { userValidator, allowedRoles } = require("../middlewares/validator");
const { subjectValidator, validate } = require("../middlewares/validator");
const router = require("express").Router();

router.post(
  "/create",
  userValidator,
  allowedRoles("admin"),
  subjectValidator,
  validate,
  createSubject
);

router.post(
  "/get-subjects",
  userValidator,
  allowedRoles("admin"),
  getAllSubjects
);

module.exports = router;

const { createSubject } = require("../controllers/subject.controller");
const { getSubjectsForClass } = require("../controllers/subject.controller");
const { getAllSubjects } = require("../controllers/subject.controller");
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
  "/get-for-class/",
  userValidator,
  allowedRoles("admin"),
  getSubjectsForClass
);

router.post("/get-all/", userValidator, allowedRoles("admin"), getAllSubjects);

module.exports = router;

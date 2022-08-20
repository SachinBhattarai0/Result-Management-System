const { validate } = require("../middlewares/validator");
const { allowedRoles } = require("../middlewares/validator");
const { createSubject } = require("../controllers/subject.controller");
const { updateSubject } = require("../controllers/subject.controller");
const { deleteSubject } = require("../controllers/subject.controller");
const { userValidator } = require("../middlewares/validator");
const { getAllSubjects } = require("../controllers/subject.controller");
const { subjectValidator } = require("../middlewares/validator");
const { getSubjectsForClass } = require("../controllers/subject.controller");
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
  "/update",
  userValidator,
  allowedRoles("admin"),
  subjectValidator,
  validate,
  updateSubject
);

router.post(
  "/delete",
  userValidator,
  allowedRoles("admin"),
  validate,
  deleteSubject
);

router.post(
  "/get-for-class/",
  userValidator,
  allowedRoles("admin"),
  getSubjectsForClass
);

router.post("/get-all/", userValidator, allowedRoles("admin"), getAllSubjects);

module.exports = router;

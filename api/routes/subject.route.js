const { createSubject } = require("../controllers/subject.controller");
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

module.exports = router;

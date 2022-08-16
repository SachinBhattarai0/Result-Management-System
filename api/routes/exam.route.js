const { createExam, getAllExam } = require("../controllers/exam.controller");
const { examValidator } = require("../middlewares/validator");
const { validate } = require("../middlewares/validator");
const { userValidator } = require("../middlewares/validator");
const { allowedRoles } = require("../middlewares/validator");
const router = require("express").Router();

router.post(
  "/create",
  userValidator,
  allowedRoles("admin"),
  examValidator,
  validate,
  createExam
);

router.post("/get-all/", userValidator, allowedRoles("admin"), getAllExam);

module.exports = router;

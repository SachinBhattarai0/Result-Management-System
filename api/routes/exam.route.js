const { createExam, getAllExam } = require("../controllers/exam.controller");
const {
  examValidator,
  validate,
  userValidator,
  allowedRoles,
} = require("../middlewares/validator");
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

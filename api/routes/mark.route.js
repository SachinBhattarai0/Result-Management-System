const {
  userValidator,
  allowedRoles,
  validate,
} = require("../middlewares/validator");
const { createMarks } = require("../controllers/mark.controller");
const router = require("express").Router();

router.post(
  "/create/",
  userValidator,
  allowedRoles(["admin", "teacher"]),
  validate,
  createMarks
);

module.exports = router;

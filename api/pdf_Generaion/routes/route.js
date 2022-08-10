const {
  generateForStudent,
  generateForClass,
} = require("../controller/controller");
const { userValidator, validate } = require("../../middlewares/validator");
const {
  pdfForStudentsEssentialValidataor,
} = require("../middlewares/validator");
const router = require("express").Router();

router.post(
  "/marksheet/student/",
  userValidator,
  pdfForStudentsEssentialValidataor,
  validate,
  generateForStudent
);
router.post("/marksheet/class/", userValidator, generateForClass);

module.exports = router;

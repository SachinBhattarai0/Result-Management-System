const { validate } = require("../middlewares/validator");
const { createExam } = require("../controllers/exam.controller");
const { getPaginatedExam } = require("../controllers/exam.controller");
const { getAllExam } = require("../controllers/exam.controller");
const { updateExam } = require("../controllers/exam.controller");
const { deleteExam } = require("../controllers/exam.controller");
const { examValidator } = require("../middlewares/validator");
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

router.post(
  "/update",
  userValidator,
  allowedRoles("admin"),
  examValidator,
  validate,
  updateExam
);

router.post(
  "/delete",
  userValidator,
  allowedRoles("admin"),
  validate,
  deleteExam
);

router.post("/get-all/", userValidator, allowedRoles("admin"), getAllExam);
router.post(
  "/get-all-paginated/",
  userValidator,
  allowedRoles("admin"),
  getPaginatedExam
);

module.exports = router;

const { createExam } = require("../controllers/exam.controller");
const { examValidator, validate } = require("../middlewares/validator");
const router = require("express").Router();

router.post("/create", examValidator, validate, createExam);

module.exports = router;

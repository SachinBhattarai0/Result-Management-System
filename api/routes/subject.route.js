const { createSubject } = require("../controllers/subject.controller");
const { subjectValidator, validate } = require("../middlewares/validator");
const router = require("express").Router();

router.post("/create", subjectValidator, validate, createSubject);

module.exports = router;

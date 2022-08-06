const { createAssignment } = require("../controllers/assignment.controller");
const { assignmentValidator, validate } = require("../middlewares/validator");
const router = require("express").Router();

router.post("/create", assignmentValidator, validate, createAssignment);

module.exports = router;

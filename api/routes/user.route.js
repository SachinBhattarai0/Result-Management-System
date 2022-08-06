const { createUser } = require("../controllers/user.controller");
const { userValidator, validate } = require("../middlewares/validator");
const router = require("express").Router();

router.post("/create", userValidator, validate, createUser);

module.exports = router;

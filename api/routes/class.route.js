const { createClass } = require("../controllers/class.controller");
const { userValidator, allowedRoles } = require("../middlewares/validator");
const router = require("express").Router();

router.post("/create", userValidator, allowedRoles("admin"), createClass);

module.exports = router;

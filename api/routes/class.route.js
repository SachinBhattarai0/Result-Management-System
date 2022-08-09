const { createClass, getAllClass } = require("../controllers/class.controller");
const { userValidator, allowedRoles } = require("../middlewares/validator");
const router = require("express").Router();

router.post("/create", userValidator, allowedRoles("admin"), createClass);

router.post("/get-all/", userValidator, allowedRoles("admin"), getAllClass);

module.exports = router;

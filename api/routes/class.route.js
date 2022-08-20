const { createClass } = require("../controllers/class.controller");
const { getAllClass } = require("../controllers/class.controller");
const { deleteClass } = require("../controllers/class.controller");
const { updateClass } = require("../controllers/class.controller");
const { userValidator } = require("../middlewares/validator");
const { allowedRoles } = require("../middlewares/validator");
const { classInfoValidator } = require("../middlewares/validator");
const { validate } = require("../middlewares/validator");

const router = require("express").Router();

router.post(
  "/create",
  userValidator,
  allowedRoles("admin"),
  classInfoValidator,
  validate,
  createClass
);

router.post(
  "/update",
  userValidator,
  allowedRoles("admin"),
  classInfoValidator,
  validate,
  updateClass
);

router.post("/delete", userValidator, allowedRoles("admin"), deleteClass);

router.post("/get-all/", userValidator, allowedRoles("admin"), getAllClass);

module.exports = router;

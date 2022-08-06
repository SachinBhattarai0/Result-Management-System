const { createUser, signIn } = require("../controllers/user.controller");
const { userValidator, allowedRoles } = require("../middlewares/validator");
const {
  userInfoValidator,
  validate,
  signInValidator,
} = require("../middlewares/validator");
const router = require("express").Router();

router.post(
  "/create",
  userValidator,
  allowedRoles("admin"),
  userInfoValidator,
  validate,
  createUser
);
router.post("/sign-in", signInValidator, validate, signIn);

module.exports = router;

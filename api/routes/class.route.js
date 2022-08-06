const { createClass } = require("../controllers/class.controller");
const router = require("express").Router();

router.post("/create", createClass);

module.exports = router;

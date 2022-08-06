const User = require("../models/user.model");
const { sendError, STUDENT } = require("../utils/utils");

exports.createUser = async (req, res) => {
  let { name, email, password, role } = req.body;
  if (!role) role = STUDENT;

  try {
    const newUser = new User({ name, email, password, role });
    await newUser.save();
    return res.status(201).json({
      message: "User Created Successfully!",
      error: false,
    });
  } catch (error) {
    return sendError(res, error.message);
  }
};

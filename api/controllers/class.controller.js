const Class = require("../models/class.model");
const { sendError } = require("../utils/utils");

exports.createClass = async (req, res) => {
  const { name } = req.body;
  if (!name) return sendError(res, "name is required!");

  const newClass = new Class({ name });

  try {
    await newClass.save();
  } catch (error) {
    return sendError(res, error.message);
  }

  return res.status(201).json({
    error: false,
    message: "Class created successfully",
    class: { id: newClass._id, name: newClass.name },
  });
};

exports.getAllClass = async (req, res) => {
  const _class = await Class.find().select("name").lean();

  return res.json({ error: false, class: _class });
};

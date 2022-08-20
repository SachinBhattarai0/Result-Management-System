const Class = require("../models/class.model");
const { sendError } = require("../utils/utils");

exports.createClass = async (req, res) => {
  const { name } = req.body;

  const newClass = new Class({ name });

  try {
    await newClass.save();
  } catch (error) {
    return sendError(res, error.message);
  }

  return res.status(201).json({
    error: false,
    message: "Class created successfully",
  });
};

exports.updateClass = async (req, res) => {
  const { name, id } = req.body;
  if (!id) return sendError(res, "id is missing!!");

  try {
    await Class.findByIdAndUpdate(id, { name });
  } catch (error) {
    return sendError(res, error.message);
  }

  return res.json({
    error: false,
    message: "Class updated successfully",
  });
};

exports.deleteClass = async (req, res) => {
  const { id } = req.body;
  if (!id) return sendError(res, "id is missing!!");

  try {
    const _class = await Class.findById(id);
    await _class.delete();
  } catch (error) {
    return sendError(res, error.message);
  }

  return res.json({
    error: false,
    message: "Class deleted successfully",
  });
};

exports.getAllClass = async (req, res) => {
  const _class = await Class.find().select("name").lean();

  return res.json({ error: false, class: _class });
};

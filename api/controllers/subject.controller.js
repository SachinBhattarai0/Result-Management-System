const { isValidObjectId } = require("mongoose");
const Subject = require("../models/subject.model");
const { sendError } = require("../utils/utils");

exports.createSubject = async (req, res) => {
  let { name, theoryMark, practicalMark, passMark, classes } = req.body;

  if (!theoryMark) theoryMark = 75;
  if (!practicalMark) practicalMark = 25;
  if (!passMark) passMark = 40;

  const newSubject = new Subject({
    name,
    theoryMark,
    practicalMark,
    passMark,
    class: classes,
  });

  try {
    await newSubject.save();
  } catch (error) {
    return sendError(res, error.message);
  }

  return res
    .status(201)
    .json({ error: false, message: "Subject Created Successfully" });
};

exports.updateSubject = async (req, res) => {
  const { name, theoryMark, practicalMark, passMark, classes, id } = req.body;
  if (!isValidObjectId(id)) return sendError(res, "Invalid subject id");

  try {
    await Subject.findOneAndUpdate(
      { _id: id },
      { name, theoryMark, practicalMark, class: classes, passMark }
    );
  } catch (error) {
    return sendError(res, error.message);
  }

  return res.json({
    error: false,
    message: "subject updated successfully",
  });
};

exports.deleteSubject = async (req, res) => {
  const { id } = req.body;
  if (!isValidObjectId(id)) return sendError(res, "Invalid subject id");

  try {
    await Subject.findByIdAndDelete(id);
  } catch (error) {
    return sendError(res, error.message);
  }

  return res.json({
    error: false,
    message: "subject deleted successfully",
  });
};

exports.getSubjectsForClass = async (req, res) => {
  if (!req.body.class || !isValidObjectId(req.body.class))
    return sendError(res, "Invalid class id");

  const subjects = await Subject.find({ class: req.body.class })
    .populate("class")
    .lean();
  res.json({ error: false, subjects });
};

exports.getAllSubjects = async (req, res) => {
  const subjects = await Subject.find({}).populate("class").lean();
  res.json({ error: false, subjects });
};

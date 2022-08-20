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

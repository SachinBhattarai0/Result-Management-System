const Subject = require("../models/subject.model");
const { sendError } = require("../utils/utils");

exports.createSubject = async (req, res) => {
  let { name, theoryMark, practicalMark, passMark, classes } = req.body;
  const { classItems } = req;

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

  return res.status(201).json({
    error: false,
    message: "Subject Created Successfully",
    subject: { name, theoryMark, practicalMark, passMark, class: classItems },
  });
};

exports.getAllSubjects = async (req, res) => {
  const subjects = await Subject.find({}).populate("class").lean();
  res.json({ error: false, subjects });
};

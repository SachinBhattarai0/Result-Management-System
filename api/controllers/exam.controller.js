const Exam = require("../models/exam.model");
const { sendError } = require("../utils/utils");

exports.createExam = async (req, res) => {
  const { name, year, month, date } = req.body;

  const newExam = new Exam({ name, year, month, date });

  try {
    await newExam.save();
  } catch (error) {
    return sendError(res, error.message);
  }

  return res.status(201).json({
    error: false,
    message: "Exam created successfully",
    exam: { id: newExam._id, name, year, month, date },
  });
};

exports.getAllExam = async (req, res) => {
  const exams = await Exam.find().select("name year month date").lean();

  return res.json({ error: false, exams });
};

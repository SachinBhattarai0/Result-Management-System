const { isValidObjectId } = require("mongoose");
const Exam = require("../models/exam.model");
const { paginator } = require("../utils/utils");
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
  });
};

exports.updateExam = async (req, res) => {
  const { name, year, month, date, id } = req.body;
  if (!isValidObjectId(id)) return sendError(res, "invalid id");

  try {
    await Exam.findOneAndUpdate({ _id: id }, { name, year, month, date });
  } catch (error) {
    sendError(res, error.message);
  }
  return res.json({ error: false, message: "Exam updated successfully!!" });
};

exports.deleteExam = async (req, res) => {
  const { id } = req.body;
  if (!isValidObjectId(id)) return sendError(res, "invalid id");

  try {
    const exam = await Exam.findOne({ _id: id });
    if (!exam) return sendError(res, "Invalid exam id");

    await exam.delete();
  } catch (error) {
    sendError(res, error.message);
  }
  return res.json({ error: false, message: "Exam deleted successfully!!" });
};

exports.getAllExam = async (req, res) => {
  const exams = await Exam.find().select("name year month date").lean();

  const currentPage = parseInt(req.query.page) || 1;
  const NoOfItemsPerPage = 30;
  const { paginatedList, pager } = paginator(
    exams,
    NoOfItemsPerPage,
    currentPage
  );

  return res.json({ error: false, pager, exams: paginatedList });
};

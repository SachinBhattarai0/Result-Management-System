const Exam = require("../models/exam.model");
const { sendError, paginator } = require("../utils/utils");

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

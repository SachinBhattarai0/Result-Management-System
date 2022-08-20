const { isValidObjectId } = require("mongoose");
const Assignment = require("../models/assignment.model");
const Student = require("../models/student.model");
const { paginator } = require("../utils/utils");
const { sendError } = require("../utils/utils");

exports.createAssignment = async (req, res) => {
  const { user, exam, subject, class: _class } = req;

  const assignmentInfo = {
    user: user._id,
    exam: exam._id,
    subject: subject._id,
    class: _class._id,
  };

  const newAssignment = new Assignment({ ...assignmentInfo });

  try {
    await newAssignment.save();
  } catch (error) {
    return sendError(res, error.message);
  }

  return res.status(201).json({
    error: false,
    message: "Assignment created successfully!",
  });
};

exports.updateAssignment = async (req, res) => {
  const { user, exam, subject, class: _class } = req.body;
  const { assignment } = req;

  try {
    assignment.user = user;
    assignment.exam = exam;
    assignment.subject = subject;
    assignment.class = _class;
    await assignment.save();
  } catch (error) {
    return sendError(res, error.message);
  }

  return res.json({
    error: false,
    message: "Assignment update successfully!",
  });
};

exports.deleteAssignment = async (req, res) => {
  const { id } = req.body;
  if (!isValidObjectId(id)) return sendError(res, "id is invlaid!!");

  try {
    await Assignment.findByIdAndDelete(id);
  } catch (error) {
    return sendError(res, error.message);
  }

  return res.json({
    error: false,
    message: "Assignment deleted successfully!",
  });
};

exports.getAllAssignments = async (req, res) => {
  const assignments = await Assignment.find({})
    .populate("user")
    .populate("exam")
    .populate("subject")
    .lean();

  res.json({ error: false, assignments });
};

exports.getAllPaginatedAssignments = async (req, res) => {
  const assignments = await Assignment.find({})
    .populate("user")
    .populate("exam")
    .populate("subject")
    .lean();

  const currentPage = parseInt(req.query.page) || 1;
  const NoOfItemsPerPage = 30;
  const { paginatedList, pager } = paginator(
    assignments,
    NoOfItemsPerPage,
    currentPage
  );

  res.json({ error: false, pager, assignments: paginatedList });
};

exports.getAssignmentListForUser = async (req, res) => {
  const loggedInUser = req.user;
  const userId = loggedInUser._id;
  let { completed } = req.body;

  if (completed !== true) completed = false;

  const assignments = await Assignment.find({
    user: userId,
    completed: completed,
  })
    .populate("exam")
    .populate("subject")
    .populate("class")
    .lean();

  const currentPage = parseInt(req.query.page) || 1;
  const NoOfItemsPerPage = 15;
  const { paginatedList, pager } = paginator(
    assignments,
    NoOfItemsPerPage,
    currentPage
  );

  return res.json({ error: false, pager, assignments: paginatedList });
};

exports.getStudentList = async (req, res) => {
  const loggedInUser = req.user;
  let { assignmentId } = req.body;

  const assignment = await Assignment.findById(assignmentId).lean();
  if (!assignment) return sendError(res, "assignmentId is invalid!");

  if (assignment.user.toString() !== loggedInUser._id.toString())
    return sendError(res, "user not authorized!");

  const students = await Student.find({
    passed: false,
    subjects: assignment.subject,
    class: assignment.class,
  })
    .select("name rollNo")
    .sort({ rollNo: 1 })
    .lean();
  return res.json({ error: false, students });
};

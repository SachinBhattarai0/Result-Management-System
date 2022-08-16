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

exports.getAllAssignments = async (req, res) => {
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

  const assignments = await Assignment.find({ userId, completed: false })
    .populate("exam")
    .populate("subject")
    .populate("class")
    .lean();

  return res.json({ error: false, assignments });
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

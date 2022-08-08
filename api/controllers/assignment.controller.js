const Assignment = require("../models/assignment.model");
const User = require("../models/user.model");
const Student = require("../models/student.model");
const { sendError, TEACHER } = require("../utils/utils");

exports.createAssignment = async (req, res) => {
  const { user, exam, subject, class: _class } = req.body;

  const userItem = await User.findById(user).lean().select("role");
  if (userItem.role !== TEACHER)
    return sendError(res, "Asignments can only be given to teachers");

  const newAssignment = new Assignment({
    user,
    exam,
    subject,
    class: _class,
  });

  try {
    await newAssignment.save();
  } catch (error) {
    return sendError(res, error.message);
  }

  return res.status(201).json({
    error: false,
    message: "Assignment created successfully!",
    assignment: { id: newAssignment._id },
  });
};

exports.getAssignmentList = async (req, res) => {
  const loggedInUser = req.user;
  const userId = loggedInUser._id;

  const assignments = await Assignment.find({ userId })
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
    subject: assignment.subject,
    class: assignment.class,
  })
    .select("name rollNo")
    .lean();

  return res.json({ error: false, students });
};

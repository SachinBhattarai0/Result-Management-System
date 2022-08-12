const Assignment = require("../models/assignment.model");
const User = require("../models/user.model");
const Exam = require("../models/exam.model");
const Subject = require("../models/subject.model");
const Class = require("../models/class.model");
const Student = require("../models/student.model");
const { sendError, TEACHER } = require("../utils/utils");

exports.createAssignment = async (req, res) => {
  const { user, exam, subject, class: _class } = req.body;

  const userItem = await User.findById(user).lean().select("role");
  if (userItem.role !== TEACHER)
    return sendError(res, "Asignments can only be given to teachers");

  const examItem = await Exam.findById(exam).lean();
  if (!examItem) return sendError(res, "Invalid examId");

  const subjectItem = await Subject.findById(subject).lean();
  if (!subjectItem) return sendError(res, "Invalid subjectId");

  const classItem = await Class.findById(_class).lean();
  if (!classItem) return sendError(res, "Invalid classId");

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
    assignment: {
      id: newAssignment._id,
      user: userItem,
      exam: examItem,
      subject: subjectItem,
      class: classItem,
    },
  });
};

exports.getAllAssignments = async ({ req, res }) => {
  const assignments = await Assignment.find({})
    .populate("user")
    .populate("exam")
    .populate("subject")
    .lean();
  res.json({ error: false, assignments });
};

exports.getAssignmentListForUser = async (req, res) => {
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

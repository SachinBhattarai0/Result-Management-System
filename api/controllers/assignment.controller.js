const Assignment = require("../models/assignment.model");
const { sendError } = require("../utils/utils");

exports.createAssignment = async (req, res) => {
  const { user, exam, subject, class: _class } = req.body;

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

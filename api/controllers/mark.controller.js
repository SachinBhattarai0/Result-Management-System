const Mark = require("../models/mark.model");
const Assignment = require("../models/assignment.model");
const { sendError } = require("../utils/utils");
const mongoose = require("mongoose");

exports.createMarks = async (req, res) => {
  const { marks } = req.body;
  const { assignment } = req;
  const { exam, class: _class, subject } = assignment;

  const session = await mongoose.startSession();

  await session.withTransaction(async () => {
    for (let i = 0; i < marks.length; i++) {
      let { student, theoryMark, practicalMark } = marks[i];

      const newMark = {
        subject: subject.name,
        theoryMark,
        practicalMark,
        total: +theoryMark + +practicalMark,
        fullTheoryMark: +subject.theoryMark,
        fullPracticalMark: +subject.practicalMark,
      };

      const markItem = await Mark.findOne({ class: _class, exam, student });

      try {
        if (markItem) {
          markItem.marks.push(newMark);
          await markItem.save({ session });
        } else {
          await Mark.create(
            [{ exam, class: _class, student, marks: [newMark] }],
            { session }
          );
        }
      } catch (error) {
        await session.abortTransaction();
        await session.endSession();

        return sendError(res, error.message);
      }
    }
    assignment.completed = true;
    await assignment.save();
  });
  await session.commitTransaction();

  return res
    .status(201)
    .send({ error: false, message: "Mark added successfuly!!" });
};

exports.getSudentsListForExam = async (req, res) => {
  const { class: _class, exams } = req.body;

  const studentList = await Mark.find({ exams, class: _class })
    .select("student")
    .populate("student")
    .lean();
  const uniqueStudentList = [];

  for (let i = 0; i < studentList.length; i++) {
    const student = studentList[i].student;
    const index = uniqueStudentList.findIndex((i) => i._id === student._id);

    if (index === -1) uniqueStudentList.push(student);
  }

  return res.json({ error: false, studentList: uniqueStudentList });
};

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
    marks.forEach(async (mark) => {
      let { student, theoryMark, practicalMark } = mark;

      const newMark = {
        subject: subject.name,
        theoryMark,
        practicalMark,
        total: +theoryMark + +practicalMark,
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
    });
    assignment.completed = true;
    await assignment.save();
  });

  await session.commitTransaction();
  await session.endSession();

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
  return res.json({ error: false, studentList });
};

const Mark = require("../models/mark.model");
const Subject = require("../models/subject.model");
const { sendError } = require("../utils/utils");
const mongoose = require("mongoose");

exports.createMarks = async (req, res) => {
  const { exam, class: _class, marks, subject: subjectId } = req.body;
  const subject = await Subject.findById(subjectId).lean().select("name");

  const session = await mongoose.startSession();

  const transactionRes = await session.withTransaction(async () => {
    for (i = 0; i < marks.length; i++) {
      let { student, theoryMark, practicalMark } = marks[i];

      const markItem = await Mark.findOne({ class: _class, exam, student });
      const newMark = {
        subject: subject.name,
        theoryMark,
        practicalMark,
        total: +theoryMark + +practicalMark,
      };

      try {
        if (markItem) {
          markItem.marks.push(newMark);
          await markItem.save({ session });
        } else {
          const newMarkItem = new Mark({
            exam,
            class: _class,
            student,
            marks: [newMark],
          });
          await newMarkItem.save();
        }
      } catch (error) {
        return sendError(res, error.message);
      }
    }
  });

  if (transactionRes) await session.commitTransaction();

  await session.endSession();

  if (transactionRes)
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

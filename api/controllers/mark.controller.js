const mongoose = require("mongoose");
const { sendError } = require("../utils/utils");
const { paginator } = require("../utils/utils");
const Mark = require("../models/mark.model");
const Student = require("../models/student.model");

exports.createMarks = async (req, res) => {
  const { marks } = req.body;
  const { assignment } = req;
  const { exam, class: _class, subject } = assignment;

  const session = await mongoose.startSession();

  await session.withTransaction(async () => {
    for (const mark of marks) {
      let { student, theoryMark, practicalMark } = mark;

      student = await Student.findById(student).lean();
      if (!student) return sendError(res, "Invalid student ids!!");

      const newMark = {
        exam: {
          id: exam._id.toString(),
          name: exam.name,
          year: exam.year,
          month: exam.month,
          date: exam.date,
        },
        class: {
          id: _class._id.toString(),
          name: _class.name,
        },
        student: {
          id: student._id.toString(),
          name: student.name,
          rollNo: student.rollNo,
        },
        marks: [
          {
            subject: subject.name,
            theoryMark,
            practicalMark,
            total: +theoryMark + +practicalMark,
            fullTheoryMark: +subject.theoryMark,
            fullPracticalMark: +subject.practicalMark,
          },
        ],
      };

      const markItem = await Mark.findOne({
        "class.id": _class._id.toString(),
        "exam.id": exam._id.toString(),
        "student.id": student._id.toString(),
      });

      try {
        if (markItem) {
          markItem.marks.push(newMark.marks[0]);
          await markItem.save({ session });
        } else {
          const newMarkItem = new Mark({ ...newMark });
          newMarkItem.save({ session });
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

  /*
  Search for all marks persent in the given exam and class and return
  list of studentNames from the markList
  */
  const MarkList = await Mark.find({
    "exam.id": exams[0].exam,
    "class.id": _class,
  }).lean();
  /*
  If in a situation occurs where new student is created in between two exams then 
  such student may not be shown in the list but that should not be bug problem
  */

  const studentList = MarkList.map((i) => i.student);

  return res.json({ error: false, studentList });
};

exports.getAllPaginatedMark = async (req, res) => {
  const marks = await Mark.find({}).lean();

  const currentPage = parseInt(req.query.page) || 1;
  const NoOfItemsPerPage = 50;
  const { paginatedList, pager } = paginator(
    marks,
    NoOfItemsPerPage,
    currentPage
  );

  return res.json({ error: false, pager, marks: paginatedList });
};

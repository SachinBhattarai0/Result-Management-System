const { sendError } = require("../../utils/utils");
const { handleBarsCompileToHTML } = require("../helper/helper");
const { convertHtmlToPdf } = require("../helper/helper");
const { getSubjectList } = require("../helper/helper");
const Mark = require("../../models/mark.model");
require("../handebars/config");

exports.generateForStudent = async (req, res) => {
  const { exams } = req.body;
  const { studentItem, classItem } = req;

  let data = { marks: [], studentName: "", rollNo: "", class: "", total: 0 };

  for (const examI of exams) {
    const { percentage, exam } = examI;

    const mark = await Mark.findOne({
      "exam.id": exam,
      "class.id": classItem._id.toString(),
      "student.id": studentItem._id.toString(),
    }).lean({ virtuals: true });

    if (!mark)
      return sendError(res, "Student doesnot have mark for all exam!!");

    data.studentName = mark.student.name;
    data.rollNo = mark.student.rollNo;
    data.class = mark.class.name;

    const currentTotal = data.total;
    const newTotal = currentTotal + (percentage / 100) * mark.total;

    if (percentage !== 100)
      mark.exam.name = `${mark.exam.name} (${percentage}%)`;

    mark.marks = mark.marks.map((subjectMark) => {
      const adjustedMark = Math.round((percentage / 100) * subjectMark.total);
      return { ...subjectMark, total: adjustedMark };
    });

    data.marks.push({ mark: mark.marks, exam: mark.exam.name });
    data.totalObtainedMark = newTotal;
  }
  data.subjects = getSubjectList(data);

  const compiledHTML = handleBarsCompileToHTML("default", data);
  const pdfBuffer = await convertHtmlToPdf(compiledHTML);

  res.send(pdfBuffer);
};

exports.generateForClass = (req, res) => {};

const Mark = require("../../models/mark.model");
const { FormatDataForPdfRendering, sendError } = require("../../utils/utils");
const {
  handleBarsCompileToHTML,
  convertHtmlToPdf,
} = require("../helper/helper");

exports.generateForStudent = async (req, res) => {
  const { exams } = req.body;
  const { studentItem: stdI, classItem: classI } = req;

  let data = { marks: [], student: stdI.name, class: classI.name, total: 0 };

  for (let i = 0; i < exams.length; i++) {
    const { percentage, exam } = exams[i];

    const markItem = await Mark.findOne({
      exam,
      class: classI._id,
      student: stdI._id,
    })
      .populate("exam")
      .lean({ virtuals: true });

    if (!markItem)
      return sendError(res, "Some of the required informations are missing!!");

    const currentTotal = data.total;
    const newTotal = currentTotal + (percentage / 100) * markItem.total;

    let examInfo;
    if (percentage !== 100) examInfo = `${markItem.exam.name} (${percentage}%)`;
    else examInfo = `${markItem.exam.name}`;

    markItem.marks = markItem.marks.map((subjectMark) => {
      return {
        ...subjectMark,
        total: Math.round((percentage / 100) * subjectMark.total),
      };
    });

    data.marks.push({ mark: markItem.marks, exam: examInfo });
    data.totalObtainedMark = newTotal;
  }

  console.log("data", data);
  console.log("marks", data.marks);

  const formatedData = FormatDataForPdfRendering(data);
  const compiledHTML = handleBarsCompileToHTML("default", formatedData);

  const pdfBuffer = await convertHtmlToPdf(compiledHTML);

  res.send(pdfBuffer);
};

exports.generateForClass = (req, res) => {};

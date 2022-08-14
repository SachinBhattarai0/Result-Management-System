const Mark = require("../../models/mark.model");
const { getFormatedData } = require("../../utils/utils");
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

    const currentTotal = data.total;
    const newTotal = currentTotal + (percentage / 100) * markItem.total;

    data.marks.push({ mark: markItem.marks, exam: markItem.exam.name });
    data.total = newTotal;
  }

  const formatedData = getFormatedData(data);
  const compiledHTML = handleBarsCompileToHTML("default", formatedData);
  // console.log(formatedData);
  // console.log(formatedData.rows);

  const pdfBuffer = await convertHtmlToPdf(compiledHTML);

  res.send(pdfBuffer);
};

exports.generateForClass = (req, res) => {};

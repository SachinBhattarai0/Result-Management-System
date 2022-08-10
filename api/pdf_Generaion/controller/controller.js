const Mark = require("../../models/mark.model");
const Class = require("../../models/class.model");
const Student = require("../../models/student.model");
const fs = require("fs");
const hbs = require("handlebars");
const pdf = require("html-pdf");

exports.generateForStudent = async (req, res) => {
  // req.body = {exams:[{examId:"",percentage:""}],class:"",student:""}
  const { exams, class: _class, student } = req.body;

  const classEl = await Class.findById(_class).select("name").lean();
  const stdEl = await Student.findById(student).select("name").lean();

  let data = { marks: [], student: stdEl.name, class: classEl.name, total: 0 };

  for (let i = 0; i < exams.length; i++) {
    const { percentage, examId: exam } = exams[i];
    const resp = await Mark.findOne({ exam, class: _class, student })
      .populate("exam")
      .lean({ virtuals: true });

    const currentTotal = data.total;
    const newTotal = currentTotal + (percentage / 100) * resp.total;

    data.marks.push({ mark: resp.marks, exam: resp.exam.name });
    data.total = newTotal;
  }

  const compiledHTML = compile("default", data);

  console.log(data);
  pdf.create(compiledHTML).toStream((err, stream) => {
    if (err) return sendError(res, "Error while generating pdf!!");
    stream.pipe(res);
  });
};

exports.generateForClass = (req, res) => {};

const compile = (templateName, data) => {
  const path = `${__dirname}/../templates/${templateName}.hbs`;
  const html = fs.readFileSync(path, "utf-8");

  return hbs.compile(html)(data);
};

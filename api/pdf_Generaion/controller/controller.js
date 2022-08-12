const Mark = require("../../models/mark.model");
const Class = require("../../models/class.model");
const Student = require("../../models/student.model");
const fs = require("fs");
const hbs = require("handlebars");
const puppeteer = require("puppeteer");

exports.generateForStudent = async (req, res) => {
  // req.body = {exams:[{examId:"",percentage:""}],class:"",student:""}
  const { exams, class: _class, student } = req.body;

  const classEl = await Class.findById(_class).select("name").lean();
  const stdEl = await Student.findById(student).select("name").lean();

  if (!classEl || !stdEl) return sendError(res, "invalid classId or stdId");

  let data = {
    marks: [],
    student: stdEl.name,
    class: classEl.name,
    total: 0,
  };

  for (let i = 0; i < exams.length; i++) {
    const { percentage, exam } = exams[i];
    const resp = await Mark.findOne({ exam, class: _class, student })
      .populate("exam")
      .lean({ virtuals: true });

    const currentTotal = data.total;
    const newTotal = currentTotal + (percentage / 100) * resp.total;

    data.marks.push({ mark: resp.marks, exam: resp.exam.name });
    data.total = newTotal;
  }

  console.log(data);
  const compiledHTML = compile("default", data);

  const browser = await puppeteer.launch();

  const page = await browser.newPage();

  await page.setContent(compiledHTML, { waitUntil: "networkidle0" });

  await page.emulateMediaType("screen");

  const pdf = await page.pdf({
    margin: { top: "100px", right: "50px", bottom: "100px", left: "50px" },
    printBackground: true,
    format: "A4",
  });

  await browser.close();

  res.send(pdf);
};

exports.generateForClass = (req, res) => {};

const compile = (templateName, data) => {
  const path = `${__dirname}/../templates/${templateName}.hbs`;
  const html = fs.readFileSync(path, "utf-8");

  return hbs.compile(html)(data);
};

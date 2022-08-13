const Mark = require("../../models/mark.model");
const { getFormatedData } = require("../../utils/utils");
const puppeteer = require("puppeteer");
const fs = require("fs");
const hbs = require("handlebars");

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
  const compiledHTML = compile("default", formatedData);
  console.log(formatedData);

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(compiledHTML, { waitUntil: "networkidle0" });
  await page.emulateMediaType("screen");

  const pdf = await page.pdf({
    margin: { top: "40px", right: "50px", left: "50px" },
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

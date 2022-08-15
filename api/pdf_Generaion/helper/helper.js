const puppeteer = require("puppeteer");
const fs = require("fs");
const hbs = require("handlebars");

exports.getUniqueSubjectList = (data) => {
  const returnedSubjects = [];

  const raw = data.marks.map(({ mark }) =>
    mark.map((markItem) => {
      if (returnedSubjects.includes(markItem.subject)) return;
      returnedSubjects.push(markItem.subject);
      return markItem;
    })
  );

  const uniqueSubjects = [];
  raw.forEach((i) => uniqueSubjects.push(...i));

  return uniqueSubjects.filter((item) => item);
};

exports.getGrade = (theoryMark, practicalMark, obtainedMark) => {
  const percentage = (obtainedMark / (theoryMark + practicalMark)) * 100;
  const GPA = (percentage / 25).toFixed(2);

  if (GPA > 3.6) return "A+";
  if (GPA > 3.2) return "A";
  if (GPA > 2.8) return "B+";
  if (GPA > 2.4) return "B";
  if (GPA > 2.0) return "C+";
  if (GPA > 1.6) return "C";
  return "NG";
};

exports.handleBarsCompileToHTML = (templateName, data) => {
  const path = `${__dirname}/../templates/${templateName}.hbs`;
  const html = fs.readFileSync(path, "utf-8");

  return hbs.compile(html)(data);
};

exports.convertHtmlToPdf = async (compiledHTML) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(compiledHTML, { waitUntil: "networkidle0" });
  await page.emulateMediaType("screen");

  const pdfBuffer = await page.pdf({
    margin: { top: "40px", right: "50px", left: "50px" },
    printBackground: true,
    format: "A4",
  });

  await browser.close();
  return pdfBuffer;
};

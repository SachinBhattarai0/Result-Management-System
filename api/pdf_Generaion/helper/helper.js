const Handlebars = require("handlebars");
const puppeteer = require("puppeteer");
const fs = require("fs");
const hbs = require("handlebars");

Handlebars.registerHelper("inc", function (value, options) {
  return parseInt(value) + 1;
});

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

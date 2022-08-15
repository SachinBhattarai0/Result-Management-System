const Handlebars = require("handlebars");
const { getGrade } = require("../helper/helper");

Handlebars.registerHelper("inc", function (value) {
  return parseInt(value) + 1;
});

Handlebars.registerHelper("returnTd", (marks, subName, thMark, prMark) => {
  let html = `<td>${thMark}</td><td>${prMark}</td>`;
  let rowTotal = 0;

  marks.forEach(({ mark }) => {
    let markForSubjectNotFound = true;
    mark.forEach((markItem) => {
      if (markItem.subject === subName) {
        markForSubjectNotFound = false;
        rowTotal += +markItem.total;
        html += `<td>${markItem.theoryMark}</td><td>${markItem.practicalMark}</td>`;
      }
    });
    if (markForSubjectNotFound) html += `<td></td><td></td>`;
  });
  html += `<td>${rowTotal}</td>`;
  html += `<td>${getGrade(thMark, prMark, rowTotal)}</td>`;
  return html;
});

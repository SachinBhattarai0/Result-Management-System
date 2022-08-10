const { check } = require("express-validator");

exports.pdfForStudentsEssentialValidataor = [
  check("class").not().trim().isEmpty().withMessage("Class must be present!!"),
  check("student")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Student must be present!!"),
  check("exams")
    .isArray({ min: 1 })
    .withMessage("exams should be non empty array!!"),
  check("exams").custom((value) => {
    value.forEach((item, i) => {
      if (!item.examId) throw new Error("Exam id is invalid ar index " + i);
      if (
        !item.percentage ||
        typeof item.percentage === "string" ||
        item.percentage > 100 ||
        item.percentage < 0
      )
        throw new Error("Percentage is invalid at index " + i);
    });
    return true;
  }),
];

const { check } = require("express-validator");
const { isValidObjectId } = require("mongoose");

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
  check("class").custom((classId) => {
    if (!isValidObjectId(classId)) throw new Error("Classid is invalid");
    return true;
  }),
  check("student").custom((studentId) => {
    if (!isValidObjectId(studentId)) throw new Error("Studentid is invalid");
    return true;
  }),
  check("exams").custom((value) => {
    value.forEach((exam, i) => {
      if (!exam.exam) throw new Error("Exam id is invalid at index " + i);
      if (!isValidObjectId(exam.exam))
        throw new Error("Exam id is invalid ar index " + i);
      if (
        !exam.percentage ||
        typeof exam.percentage === "string" ||
        exam.percentage > 100 ||
        exam.percentage < 0
      )
        throw new Error("Percentage is invalid at index " + i);
    });
    return true;
  }),
  check("exams").custom((exams) => {
    const totalPercentage = exams.reduce((pv, cv) => pv + cv.percentage, 0);
    if (totalPercentage > 100)
      throw new Error("total percentage must be less than 100!!");
    return true;
  }),
];

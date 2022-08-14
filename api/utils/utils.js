const TEACHER = "teacher";
const ADMIN = "admin";

exports.TEACHER = TEACHER;
exports.ADMIN = ADMIN;

exports.userRoles = [TEACHER, ADMIN];

exports.emailValidatorRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

exports.sendError = (res, msg, code = 400) => {
  res.status(code).json({ error: true, message: msg });
};

exports.getFormatedData = (data) => {
  let subjectNames = [];
  // gets list of all subect names
  const raw = data.marks.map((mi) => mi.mark.map((i) => i.subject));
  raw.forEach((i) => subjectNames.push(...i));

  const uniqueSubName = [];
  //removes duplicates from subject names
  subjectNames.forEach((i) => {
    if (!uniqueSubName.includes(i)) uniqueSubName.push(i);
  });

  const rowTotals = [];
  const fullTheoryMark = [];
  const fullPracticalMark = [];

  // formats the data row wise as they are to be shown in pdf
  const rows = uniqueSubName.map((subname) => {
    let rowTotal = 0;
    const row = data.marks.map(({ mark }, rowIndex) => {
      for (let markIndex = 0; markIndex < mark.length; markIndex++) {
        if (mark[markIndex].subject === subname) {
          rowTotal += mark[markIndex].total;
          fullTheoryMark[rowIndex] = mark[markIndex].fullTheoryMark;
          fullPracticalMark[rowIndex] = mark[markIndex].fullPracticalMark;
          return mark[markIndex];
        }
      }
    });
    rowTotals.push(rowTotal);
    return row;
  });

  const { student, class: _class, total } = data;
  const exams = data.marks.map((i) => i.exam);

  return {
    rows,
    student,
    exams,
    class: _class,
    rowTotals,
    total,
    subjects: uniqueSubName,
    fullPracticalMark,
    fullTheoryMark,
  };
};

const TEACHER = "teacher";
const ADMIN = "admin";

exports.TEACHER = TEACHER;
exports.ADMIN = ADMIN;

exports.userRoles = [TEACHER, ADMIN];

exports.emailValidatorRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

exports.sendError = (res, msg, code = 400) => {
  res.status(code).json({ error: true, message: msg });
};

exports.FormatDataForPdfRendering = (data) => {
  let subjectNames = [];
  // gets list of all subect names
  const raw = data.marks.map((mi) => mi.mark.map((i) => i.subject));
  raw.forEach((i) => subjectNames.push(...i));

  const uniqueSubName = [];
  //removes duplicates from subject names
  subjectNames.forEach((i) => {
    if (!uniqueSubName.includes(i)) uniqueSubName.push(i);
  });

  //rowTotals will include array of total marks in each row
  const rowTotals = [];
  //fullTheoryMarks will include array of theory marks for each subject row wise
  const fullTheoryMarks = [];
  //fullPracticalMark will include array of practical marks for each subject row wise
  const fullPracticalMarks = [];

  // the rows contain rowWise datas that are to be presened in pdf
  const rows = uniqueSubName.map((subname) => {
    //rowTotal will count total marks in each row
    let rowTotal = 0;
    const row = data.marks.map(({ mark }, rowIndex) => {
      // check for each mark and if the mark belong to the subject for the row
      //then returns the subject
      for (let markIndex = 0; markIndex < mark.length; markIndex++) {
        if (mark[markIndex].subject === subname) {
          rowTotal += mark[markIndex].total;
          fullTheoryMarks[rowIndex] = mark[markIndex].fullTheoryMark;
          fullPracticalMarks[rowIndex] = mark[markIndex].fullPracticalMark;
          return mark[markIndex];
        }
      }
    });
    //pushing the row total in array of rowTotals
    rowTotals.push(rowTotal);
    // returing the row
    return row;
  });

  const { student, class: _class, totalObtainedMark } = data;
  const exams = data.marks.map((i) => i.exam);

  return {
    rows,
    student,
    class: _class,
    exams,
    rowTotals,
    totalObtainedMark,
    subjects: uniqueSubName,
    fullPracticalMarks,
    fullTheoryMarks,
  };
};

const Mark = require("../models/mark.model");

exports.createMarks = (req, res) => {
  // {exam:"",class"",marks:[{student:"",theoryMark:"",practicalMark:""}]}

  const { exam, class: _class, marks } = req.body;
};

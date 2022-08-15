const express = require("express");
const userRoutes = require("./routes/user.route");
const assignmentRoutes = require("./routes/assignment.route");
const subjectRoutes = require("./routes/subject.route");
const classRoutes = require("./routes/class.route");
const examRoutes = require("./routes/exam.route");
const markRoutes = require("./routes/mark.route");
const pdfRoutes = require("./pdf_Generaion/routes/route");
const cors = require("cors");
require("./models/user.model");
require("./db");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/assignment", assignmentRoutes);
app.use("/api/subject", subjectRoutes);
app.use("/api/class", classRoutes);
app.use("/api/exam", examRoutes);
app.use("/api/mark", markRoutes);
app.use("/api/pdf/", pdfRoutes);

app.listen(8000, () => console.log("Listening at port 8000!"));

// Things to be done later
console.log(
  "before updating assignemts check if the assignment is already done or not"
);
console.log("Add filter in student marks and assignment page");
console.log(
  "Add pagination in assignment,reportCard,Mark,Exam,user,stuent,class,Subject"
);

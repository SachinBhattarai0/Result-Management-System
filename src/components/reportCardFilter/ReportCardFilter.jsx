import React, { useEffect, useState } from "react";
import Select from "../../container/form/Select";
import Button from "../../container/form/Button";
import { useAlert } from "../../context/AlertContext";
import { apiWithJwt } from "../../axios";
import Spinner from "../../container/spinner/Spinner";

const ReportCardFilter = ({
  studentList,
  setStudentList,
  filterInfo,
  setFilterInfo,
}) => {
  const { updateAlert } = useAlert();
  const [exam, setExam] = useState([]);
  const [_class, setClass] = useState([]);

  useEffect(() => {
    const fetchExamAndClass = async () => {
      try {
        const [exam, _class] = await Promise.all([
          apiWithJwt("/exam/get-all/"),
          apiWithJwt("/class/get-all/"),
        ]);

        setExam([...exam.data.exams]);
        setClass([..._class.data.class]);
      } catch (error) {
        updateAlert("Some error occured!!");
      }
    };

    fetchExamAndClass();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { class: _class, exams } = filterInfo;

    try {
      setStudentList({ ...studentList, isPending: true });

      const { data } = await apiWithJwt("/mark/student-list-for-exam", {
        class: _class,
        exams,
      });
      console.log(data);

      setStudentList({
        ...studentList,
        isPending: false,
        pager: data.pager,
        students: data.studentList,
      });
    } catch (error) {
      setStudentList({ ...studentList, isPending: false });
      updateAlert(error.response.data.message);
    }
  };

  const addExam = () => {
    const prevExams = filterInfo.exams;
    prevExams.push({ exam: "", percentage: 100 });
    setFilterInfo({
      ...filterInfo,
      exams: prevExams,
      noOfExam: filterInfo.noOfExam + 1,
    });
  };

  const removeExam = () => {
    if (filterInfo.noOfExam > 1) {
      const newExams = filterInfo.exams.splice(0, filterInfo.exams.length - 1);
      setFilterInfo({
        ...filterInfo,
        exams: newExams,
        noOfExam: filterInfo.noOfExam - 1,
      });
    }
  };

  const handleNameChange = ({ target }) =>
    setFilterInfo({ ...filterInfo, class: target.value });

  const handleExamChange = ({ target }, i) => {
    let prevExamArr = filterInfo.exams;
    prevExamArr[i].exam = target.value;
    setFilterInfo({ ...filterInfo, exams: prevExamArr });
  };

  const handleExamPercentChange = ({ target }, i) => {
    let prevExamArr = filterInfo.exams;
    prevExamArr[i].percentage = +target.value;
    setFilterInfo({ ...filterInfo, exams: prevExamArr });
  };

  return (
    <div className="md:flex-3 bg-white p-2 md:mx-2 rounded-sm border-2 border-gray-200 md:max-h-80">
      <h2 className="text-xl">Filter</h2>
      <hr />
      <form
        onSubmit={handleSubmit}
        className="mt-1 max-h-9/10 overflow-y-scroll"
      >
        <div className="flex flex-col">
          <Select onChange={handleNameChange} label="Class:">
            {_class.map(({ _id, name }) => (
              <option key={_id} value={_id}>
                {name}
              </option>
            ))}
          </Select>
        </div>

        <div className="flex flex-col mt-1">
          <label htmlFor="class">
            Exam:{" "}
            <span className="cursor-pointer" onClick={addExam}>
              +
            </span>
            <span className="cursor-pointer ml-1" onClick={removeExam}>
              -
            </span>
          </label>
          {Array(filterInfo?.noOfExam)
            .fill("")
            .map((_, i) => (
              <div className="flex" key={i}>
                <Select onChange={(e) => handleExamChange(e, i)}>
                  {exam.map(({ _id, name, year, month, date }) => (
                    <option key={_id} value={_id}>
                      {name} ({year}-{month}-{date})
                    </option>
                  ))}
                </Select>
                <input
                  type="number"
                  onChange={(e) => handleExamPercentChange(e, i)}
                  className="w-10 px-1 outline-none border border-gray-300 focus:border-blue-600"
                  defaultValue={100}
                />
              </div>
            ))}
        </div>

        <div className="flex flex-col mt-2">
          <Button sm variant="gray" isPending={studentList.isPending}>
            {studentList.isPending ? <Spinner /> : "Search"}
          </Button>
        </div>
      </form>
      <div className="flex flex-col mt-[1px] mr-2">
        <Button sm variant="darkBlue" isPending={studentList.isPending}>
          Download Full
        </Button>
      </div>
    </div>
  );
};

export default ReportCardFilter;

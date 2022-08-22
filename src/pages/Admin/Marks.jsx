import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { IoMdArrowDropright } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";
import { apiWithJwt } from "../../axios";
import { useAlert } from "../../context/AlertContext";
import Content from "../../components/content/Content";
import Spinner from "../../components/spinner/Spinner";
import Pagination from "../../components/pagination/Pagination";

const Marks = () => {
  const { updateAlert } = useAlert();
  const [pageNo, setPageNo] = useState(1);
  const [openedMarkItem, setOpenedMarkItem] = useState([]);
  const [markState, setMarkState] = useState({
    isPending: false,
    pager: {},
    markList: [],
  });

  const handleMarkItemClick = (id) => {
    const index = openedMarkItem.indexOf(id);
    const newOpendedMarkItemArr = openedMarkItem;

    if (index === -1) {
      newOpendedMarkItemArr.push(id);
    } else {
      newOpendedMarkItemArr.splice(index, 1);
    }

    setMarkState({ ...markState });
    setOpenedMarkItem(newOpendedMarkItemArr);
  };

  useEffect(() => {
    const fetchMarkList = async () => {
      setMarkState({ ...markState, isPending: true });
      try {
        const { data } = await apiWithJwt(
          "/mark/get-marks-paginated?page=" + pageNo
        );
        setMarkState({
          ...markState,
          isPending: false,
          pager: data.pager,
          markList: data.marks,
        });
        console.log(data);
      } catch (error) {
        console.log(error);
        setMarkState({ ...markState, isPending: false });
      }
    };
    fetchMarkList();
  }, [pageNo]);

  return (
    <Content>
      <div className="flex-1 p-1 md:p-5 flex flex-col">
        <div className="flex flex-col space-y-2 bg-white p-3">
          <h3 className="text-xl">Mark Lists:</h3>
          <hr />
          {markState.markList.map((mark, i) => (
            <div key={i} className="rounded border-gray-400 border p-3">
              <div className="flex items-center space-x-5 flex-wrap">
                <div>
                  {openedMarkItem.includes(mark._id) ? (
                    <IoMdArrowDropdown
                      className="text-3xl text-gray-500 cursor-pointer"
                      onClick={() => handleMarkItemClick(mark._id)}
                    />
                  ) : (
                    <IoMdArrowDropright
                      className="text-3xl text-gray-500 cursor-pointer"
                      onClick={() => handleMarkItemClick(mark._id)}
                    />
                  )}
                </div>
                <div>
                  Exam: {mark.exam.name}({mark.exam.year}-{mark.exam.month}-
                  {mark.exam.date})
                </div>
                <div>Class: {mark.class.name}</div>
                <div>Name: {mark.student.name}</div>
              </div>
              {openedMarkItem.includes(mark._id) && (
                <div className="mx-12 flex flex-col space-y-3 mt-3">
                  {mark.marks.map((subjectMark, i) => (
                    <div key={i} className="flex space-x-10">
                      <span className="w-28">{subjectMark.subject}</span>
                      <span>{subjectMark.theoryMark}</span>
                      <span>{subjectMark.practicalMark}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {markState.isPending && <Spinner />}

      <Pagination pager={markState.pager} setPageNo={setPageNo} />
    </Content>
  );
};

export default Marks;

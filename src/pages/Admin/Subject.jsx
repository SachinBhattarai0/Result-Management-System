import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiWithJwt } from "../../axios/index";
import { AiFillEdit } from "react-icons/ai";
import { BiTrash } from "react-icons/bi";
import { useAlert } from "../../context/AlertContext";
import { SUCCESS } from "../../context/AlertContext";
import { useModalState } from "../../context/ModalContext";
import Spinner from "../../container/spinner/Spinner";
import Popover from "../../container/popovers/Popover";
import Content from "../../container/content/Content";
import SubjectCreateOptions from "../../components/subjectCreateOptions/SubjectCreateOptions";

const Subject = () => {
  const navigate = useNavigate();
  const { updateAlert } = useAlert();
  const { showModal, closeModal } = useModalState();
  const [subjectCreatedOrDeleted, setSubjectCreatedOrDeleted] = useState("");
  const [subjectState, setSubjectState] = useState({
    isPending: false,
    subjectList: [],
  });

  const deleteSubject = async (id) => {
    try {
      setSubjectState({ ...subjectState, isPending: true });
      const { data } = await apiWithJwt("/subject/delete/", { id });
      updateAlert(data.message, SUCCESS);
      closeModal();
      //This state change will trigger useEffect to fetch new student list
      setSubjectCreatedOrDeleted(Math.random());
    } catch (error) {
      console.log(error);
      updateAlert(error.message);
    }
  };

  const handleUpdateButtonClick = (subject) => {
    navigate("/rms/admin/subject/update/", {
      state: subject,
    });
  };

  const handleDeleteButtonClick = (subject) => {
    showModal(
      "Are you sure?",
      "You are about to delete the subject " + subject.name,
      () => deleteSubject(subject._id)
    );
  };

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        setSubjectState({ ...subjectState, isPending: true });
        const { data } = await apiWithJwt("/subject/get-all/");
        setSubjectState({
          ...subjectState,
          isPending: false,
          subjectList: data.subjects,
        });
      } catch (error) {
        setSubjectState({ ...subjectState, isPending: false });
        console.log(error);
      }
    };
    fetchSubjects();
  }, [subjectCreatedOrDeleted]);

  return (
    <Content>
      <SubjectCreateOptions
        setSubjectCreatedOrDeleted={setSubjectCreatedOrDeleted}
      />
      <table className="bg-white w-full rounded shadow-sm">
        <tbody>
          <tr>
            <th className="border-2 py-3 px-1">#</th>
            <th className="border-2 py-3 px-1">Name</th>
            <th className="border-2 py-3 px-1">ThMark</th>
            <th className="border-2 py-3 px-1">PrMark</th>
            <th className="border-2 py-3 px-1">PassMark</th>
            <th className="border-2 py-3 px-1">Classes</th>
            <th className="border-2 py-3 px-1">Action</th>
          </tr>

          {subjectState.subjectList.map((subject, i) => {
            return (
              <tr key={i}>
                <td className="border-2 py-3 px-1 text-center">{i + 1}</td>
                <td className="border-2 py-3 px-1 text-center">
                  {subject.name}
                </td>
                <td className="border-2 py-3 px-1 text-center">
                  {subject.theoryMark}
                </td>
                <td className="border-2 py-3 px-1 text-center">
                  {subject.practicalMark}
                </td>
                <td className="border-2 py-3 px-1 text-center">
                  {subject.passMark}
                </td>
                <td className="border-2 py-3 px-1 text-xs text-center flex flex-col">
                  <Popover>
                    {subject.class.map((c, i) => (
                      <span key={i}>{c.name},</span>
                    ))}
                  </Popover>
                </td>
                <td className="border-2 py-3 px-1 text-center">
                  {" "}
                  <button className="text-xl ml-2">
                    <AiFillEdit
                      className="text-green-700"
                      onClick={() => handleUpdateButtonClick(subject)}
                    />
                  </button>
                  <button className="text-xl ml-2">
                    <BiTrash
                      className="text-red-700"
                      onClick={() => handleDeleteButtonClick(subject)}
                    />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {subjectState.isPending && <Spinner />}
    </Content>
  );
};

export default Subject;

import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { apiWithJwt } from "../../axios";
import { useAlert } from "../../context/AlertContext";
import Content from "../../container/content/Content";
import Spinner from "../../container/spinner/Spinner";
import Pagination from "../../container/pagination/Pagination";
import MarkListItem from "../../components/markListItem/MarkListItem";

const Marks = () => {
  const { updateAlert } = useAlert();
  const [pageNo, setPageNo] = useState(1);
  const [markState, setMarkState] = useState({
    isPending: false,
    pager: {},
    markList: [],
  });

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
            <MarkListItem mark={mark} key={i} />
          ))}
        </div>
      </div>

      {markState.isPending && <Spinner />}

      <Pagination pager={markState.pager} setPageNo={setPageNo} />
    </Content>
  );
};

export default Marks;

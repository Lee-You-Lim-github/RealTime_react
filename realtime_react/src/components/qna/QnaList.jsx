import { useApiAxios } from "api/base";
import { useAuth } from "contexts/AuthContext";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import QnaSummary from "./QnaSummary";

function UserQnaList({ itemsPerPage = 10, userId }) {
  const navigate = useNavigate();
  const [auth] = useAuth();
  const [query, setQuery] = useState();
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState();
  const [page, setPage] = useState(0);
  const [reload, setReload] = useState(false);

  const [{ data, loading, error }, getQna] = useApiAxios(
    {
      url: `/qna/api/qna/?user_id=${userId}&${
        page ? "page=" + (page + 1) : "page=1"
      }${query ? "&query=" + query : ""}`,
      method: "GET",
    },
    { manual: true }
  );

  useEffect(() => {
    setReload((prevState) => !prevState);
  }, [page]);

  // 리로드 값 변경 때마다 엑시오스 함수 호출

  useEffect(() => {
    getQna()
      .then(({ data }) => {
        setPageCount(Math.ceil((data?.count ? data.count : 1) / itemsPerPage));
        setCurrentItems(data?.results);
        // setQuery("");
      })
      .catch((error) => {
        console.log(error);
      });
  }, [reload]);

  // 페이지 클릭 이벤트

  const handlePageClick = (event) => {
    setPage(event.selected);
  };

  console.log(currentItems);
  return (
    <div>
      <div>
        {currentItems?.map((qna, index) => (
          <QnaSummary qna={qna} key={qna.id} index={index} />
        ))}
      </div>

      <ReactPaginate
        className="pagination"
        breakLabel="..."
        previousLabel="<"
        nextLabel=">"
        pageCount={pageCount}
        pageRangeDisplayed={itemsPerPage}
        onPageChange={handlePageClick}
        renderOnZeroPageCount={null}
      />
    </div>
  );
}

export default UserQnaList;

import { useApiAxios } from "api/base";
import { useCallback, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import AdminQnaSummary from "./AdminQnaSummary";

function AdminQnaList({ itemsPerPage = 10 }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState();
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState();
  const [page, setPage] = useState(0);
  const [reload, setReload] = useState(false);
  const [Authority, setAuthority] = useState("");

  const [{ data, loading, error }, getQna] = useApiAxios(
    {
      url: `/qna/api/qna/`,
      method: "GET",
    },
    { manual: true }
  );

  useEffect(() => {
    setReload((prevState) => !prevState);
  }, [page]);

  // 리로드 값 변경 때마다 엑시오스 함수 호출
  const fetchApplications = useCallback(
    async (newPage, newQuery = query) => {
      const params = {
        page: newPage,
        query: newQuery,
        authority: Authority,
      };

      const { data } = await getQna({ params });

      setPage(newPage);
      setPageCount(Math.ceil(data.count / itemsPerPage));
      setCurrentItems(data?.results);
    },
    [Authority, query, getQna]
  );

  useEffect(() => {
    fetchApplications(1);
  }, []);

  // 페이지 클릭 이벤트

  const handlePageClick = (event) => {
    fetchApplications(event.selected + 1);
  };

  //검색

  const search = (e) => {
    if (e.key === "Enter") {
      fetchApplications(1, query);
    }
  };

  // 카테고리

  const Authoritycategory = (e) => {
    e.preventDefault();
    fetchApplications(1, query);
  };

  return (
    <div>
      <div className="text-right flex justify-end mb-3">
        <select onChange={(e) => setAuthority(e.target.value)}>
          <option value="" selected>
            전체
          </option>
          <option value="0">개인</option>
          <option value="1">사업자</option>
        </select>
        <button
          className="mr-8 bg-stone-400 text-white w-12 h-6 rounded rounded-sm"
          onClick={Authoritycategory}
        >
          검색
        </button>

        <input
          className="w-40 outline-none  border-b border-orange-400"
          type="search"
          name="search"
          placeholder="제목으로 검색"
          onKeyPress={search}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
      </div>

      <div>
        <table className="border-t-2  border-orange-400 w-full">
          <thead className="border-b border-orange-400">
            <tr>
              <td className="p-5 w-30 text-justify">번호</td>
              <td className="w-30 pl-10 text-center">구분</td>
              <td className="w-80 pl-48 text-center">제목</td>
              <td className="w-70 pl-40 ">등록일</td>
              <td className="p-5 w-30 text-right">답변여부</td>
            </tr>
          </thead>
        </table>

        <div>
          {currentItems?.map((qna, index) => (
            <div className="m-auto">
              <AdminQnaSummary qna={qna} key={qna.id} index={index} />
            </div>
          ))}
        </div>
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

export default AdminQnaList;

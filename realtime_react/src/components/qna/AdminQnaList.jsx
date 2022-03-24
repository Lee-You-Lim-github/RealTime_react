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
      <div>
        <select onChange={(e) => setAuthority(e.target.value)}>
          <option value="" selected>
            전체
          </option>
          <option value="0">개인</option>
          <option value="1">사업자</option>
        </select>
        <button onClick={Authoritycategory}>검색</button>
      </div>
      <div className="text-right mb-2 flex justify-end">
        <input
          className="w-70 h-10 border-b border-orange-400 outline-none"
          type="search"
          name="search"
          placeholder="제목으로 검색할 수 있어요."
          onKeyPress={search}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
      </div>
      <div>
        {currentItems?.map((qna, index) => (
          <AdminQnaSummary qna={qna} key={qna.id} index={index} />
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

export default AdminQnaList;

import { useApiAxios } from "api/base";
import { useCallback, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import AdminwaitingSummary from "./AdminwaitingSummary";

function AdminwaitingList({ itemsPerPage = 10 }) {
  const [query, setQuery] = useState();
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState();
  const [page, setPage] = useState(0);
  const [reload, setReload] = useState(false);
  const [{ data: waiting, loading, error }, getwaiting] = useApiAxios(
    {
      url: `/waiting/api/waitings/`,
      method: "GET",
    },
    { manual: true }
  );

  useEffect(() => {
    setReload((prevState) => !prevState);
  }, [page]);

  const fetchApplications = useCallback(
    async (newPage, newQuery = query) => {
      const params = {
        page: newPage,
        query: newQuery,
      };

      const { data } = await getwaiting({ params });

      setPage(newPage);
      setPageCount(Math.ceil(data.count / itemsPerPage));
      setCurrentItems(data?.results);
    },
    [query, getwaiting]
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

  return (
    <div>
      <div className="text-right mb-2 flex justify-end">
        <input
          className=" h-10 border-b border-orange-400 outline-none"
          type="search"
          name="search"
          placeholder="이름/전화번호 검색"
          onKeyPress={search}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
      </div>
      <div>
        {currentItems?.map((wait, index) => (
          <AdminwaitingSummary wait={wait} key={wait.id} index={index} />
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

export default AdminwaitingList;

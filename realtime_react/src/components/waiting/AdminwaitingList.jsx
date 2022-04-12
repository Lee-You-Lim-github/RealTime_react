import { useApiAxios } from "api/base";
import { useCallback, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import AdminwaitingSummary from "./AdminwaitingSummary";
import waitinglist from "assets/img/waitinglist.png";

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
    <div className="bg-white p-8 rounded-md w-[900px] m-auto">
      <div className="flex items-center justify-between pb-4 md:flex">
        <div className="flex flex-row">
          <img className="w-10 h-10 ml-2" src={waitinglist} alt="waitinglist" />
          <h2
            h2
            className="text-gray-600 px-4 py-1 font-semibold sm:flex-1 text-3xl md:text-2xl lg:text-2xl cursor-pointer"
          >
            대기 현황
          </h2>
        </div>

        <div className="flex items-center justify-between">
          <div className="relative text-gray-600 mr-2">
            <input
              type="search"
              name="serch"
              onChange={(e) => {
                setQuery(e.target.value);
              }}
              onKeyPress={search}
              placeholder="이름/휴대폰 번호"
              className="bg-wihte h-9 px-2 pr-10 text-sm outline-none border-b-2 border-orange-400"
            />
            <button
              type="button"
              onClick={search}
              onChange={(e) => {
                setQuery(e.target.value);
              }}
              className="absolute right-0 top-0 mt-2.5 mr-4 bg-gray-50"
            >
              <svg
                className="bg-white h-4 w-4 fill-current"
                version="1.1"
                id="Capa_1"
                x="0px"
                y="0px"
                viewBox="0 0 56.966 56.966"
                width="512px"
                height="512px"
              >
                <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div>
        {waiting && (
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full overflow-hidden">
              <table className="table-auto min-w-full whitespace-no-wrap">
                <thead>
                  <tr>
                    <th className="px-3 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      No.
                    </th>
                    <th className="px-3 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      사업자등록번호
                    </th>
                    <th className="px-3 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      매장명
                    </th>
                    <th className="px-3 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      대기자ID
                    </th>
                    <th className="px-3 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      대기자명
                    </th>
                    <th className="px-3 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      대기날짜
                    </th>
                    <th className="px-3 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      예약시간
                    </th>
                    <th className="px-3 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      대기 테이블 수
                    </th>
                    <th className="px-3 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      방문여부
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems?.map((wait, index) => (
                    <AdminwaitingSummary
                      wait={wait}
                      key={wait.id}
                      index={index}
                    />
                  ))}
                </tbody>
              </table>
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
        )}
      </div>
    </div>
    // <div>
    //   <div className="text-right mb-2 flex justify-end">
    //     <input
    //       className=" h-10 border-b border-orange-400 outline-none"
    //       type="search"
    //       name="search"
    //       placeholder="이름/전화번호 검색"
    //       onKeyPress={search}
    //       onChange={(e) => {
    //         setQuery(e.target.value);
    //       }}
    //     />
    //   </div>
    //   <div>
    //     {currentItems?.map((wait, index) => (
    //       <AdminwaitingSummary wait={wait} key={wait.id} index={index} />
    //     ))}
    //   </div>

    //   <ReactPaginate
    //     className="pagination"
    //     breakLabel="..."
    //     previousLabel="<"
    //     nextLabel=">"
    //     pageCount={pageCount}
    //     pageRangeDisplayed={itemsPerPage}
    //     onPageChange={handlePageClick}
    //     renderOnZeroPageCount={null}
    //   />
    // </div>
  );
}

export default AdminwaitingList;

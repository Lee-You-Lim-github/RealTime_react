import "../Paginations/Paginations.css";
import { useApiAxios } from "api/base";
import AdminBookingComponent from "components/admin/AdminBookingComponent";
import { useAuth } from "contexts/AuthContext";
import { useCallback, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

function AdminBooking({ itemsPerPage = 10 }) {
  const [auth] = useAuth();

  // paging
  const [, setItem] = useState(null);
  const [pageCount, setPageCount] = useState(1);
  const [, setPage] = useState(1);

  // search
  const [query, setQuery] = useState();

  // reload
  const [, setReload] = useState(false);

  // get_bookings
  const [{ data: getBookingData }, refetch] = useApiAxios(
    {
      url: `/booking/api/bookings/${query ? "?query=" + query : ""}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${auth.access}`,
      },
    },
    { manual: true }
  );

  const fetchApplication = useCallback(
    async (newPage, newQuery = query) => {
      const params = {
        page: newPage,
        query: newQuery,
      };

      const { data } = await refetch({ params });

      setPage(newPage);
      setPageCount(Math.ceil(data.count / itemsPerPage));
      setItem(data?.results);
    },
    [query]
  );

  // get_bookings_refetch()
  useEffect(() => {
    fetchApplication(1);
  }, []);

  const handlePage = (event) => {
    fetchApplication(event.selected + 1);
  };

  // 매장명 / 유저명으로 검색
  const search = (e) => {
    if (e.key === "Enter") {
      const { value } = e.target;
      setQuery(value);
      setReload((prevState) => !prevState);
    }
    refetch();
  };

  const getQuery = (e) => {
    const { value } = e.target;
    setQuery(value);
  };

  return (
    <div className="bg-white p-8 rounded-md w-full">
      <div className=" flex items-center justify-between pb-6">
        <div>
          <h2 className="text-gray-600 font-semibold">예약현황</h2>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex bg-gray-50 items-center p-2 rounded-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clip-rule="evenodd"
              />
            </svg>
            <input
              className="bg-gray-50 outline-none ml-1 block "
              type="search"
              onChange={getQuery}
              onKeyPress={search}
              placeholder="매장명/예약자명"
            />
          </div>
        </div>
      </div>
      <div>
        {getBookingData && (
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-3 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      No.
                    </th>
                    <th className="px-3 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      사업자등록번호
                    </th>
                    <th className="px-3 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      매장명
                    </th>
                    <th className="px-3 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      예약자ID
                    </th>
                    <th className="px-3 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      예약자명
                    </th>
                    <th className="px-3 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      예약날짜
                    </th>
                    <th className="px-3 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      예약시간
                    </th>
                    <th className="px-3 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      예약 테이블 수
                    </th>
                    <th className="px-3 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      방문여부
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {getBookingData?.results?.map((booking) => {
                    return <AdminBookingComponent booking={booking} />;
                  })}
                </tbody>
              </table>
              <ReactPaginate
                breakLabel="..."
                nextLabel=">"
                onPageChange={handlePage}
                pageRangeDisplayed={itemsPerPage}
                pageCount={pageCount}
                previousLabel="<"
                renderOnZeroPageCount={null}
                className="pagination"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminBooking;

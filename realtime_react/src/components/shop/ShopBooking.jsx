import "../Paginations/Paginations.css";
import { useApiAxios } from "api/base";
import { useAuth } from "contexts/AuthContext";
import { useCallback, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import ShopBookingComponent from "./ShopBookingComponent";

function ShopBooking({ shopId, itemsPerPage = 10 }) {
  const [auth] = useAuth();

  // paging
  const [, setItem] = useState(null);
  const [pageCount, setPageCount] = useState(1);
  const [, setPage] = useState(1);

  //disabled
  const [loading, setLoading] = useState(false);

  // search
  const [query, setQuery] = useState();

  // reload
  const [reload, setReload] = useState(false);

  // 값 빼오기
  const [shop_array, setShop_array] = useState([]);

  // get_bookings
  const [
    {
      data: getBookingData,
      loading: getBookingLoading,
      error: getBookingError,
    },
    refetch,
  ] = useApiAxios(
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
    refetch();
    fetchApplication(1);
    setLoading(false);
  }, []);

  const handlePage = (event) => {
    fetchApplication(event.selected + 1);
  };

  // 해당 매장의 예약자만 보이기
  useEffect(() => {
    const abc = getBookingData?.results?.filter(
      (shop_booking) => parseInt(shopId) === shop_booking.shop_id.id
    );

    setShop_array(abc);
  }, [getBookingData, shopId]);

  // booking - visit_status만 수정
  const [
    { loading: shopBookingsLoading, error: shopBookingsError },
    saveBookingVisitState,
  ] = useApiAxios(
    {
      url: `/booking/api/bookings/`,
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${auth.access}`,
      },
    },
    { manual: true }
  );

  // 회원이 방문한 경우
  const clickedVisit = useCallback((booking_id) => {
    if (window.confirm("방문 하셨습니까?")) {
      saveBookingVisitState({
        url: `/booking/api/bookings/${booking_id}/`,
        data: { visit_status: "1" },
      })
        .then((response) => {
          alert("방문이 확인되었습니다.");
          console.log(response.data.visit_status);
          refetch();
          setLoading(true);
        })
        .catch((error) => console.log(error));
    }
  }, []);

  // 회원이 미방문한 경우
  const clickedUnvisited = useCallback((booking_id) => {
    if (window.confirm("미방문으로 인해 사용자에게 패널티가 부여됩니다.")) {
      saveBookingVisitState({
        url: `/booking/api/bookings/${booking_id}/`,

        data: { visit_status: "2" },
      })
        .then((response) => {
          alert("패널티가 부여되었습니다.");
          console.log(response.data.visit_status);
          refetch();
          setLoading(true);
        })
        .catch((error) => console.log(error));
    }
  }, []);

  // 이름 / 휴대폰 뒷자리로 검색
  const search = (e) => {
    console.log(e.target.value);
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
    <div>
      <div className="bg-white p-8 rounded-md w-full">
        <div className=" flex items-center justify-between pb-6">
          <div>
            <h2 className="text-gray-600 font-semibold">예약현황</h2>
            <span className="text-xs">예약자명단</span>
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
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                className="bg-gray-50 outline-none ml-1 block "
                type="search"
                placeholder="이름/휴대폰 번호 뒷자리"
                onChange={getQuery}
                onKeyPress={search}
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
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        No.
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        이름
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        휴대폰 번호
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        예약날짜
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        예약시간
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        예약 테이블 수
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        방문여부
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ */}
                    {shop_array?.map((shop_booking) => {
                      return (
                        <ShopBookingComponent
                          key={shop_booking.id}
                          shop_booking={shop_booking}
                          clickedVisit={clickedVisit}
                          clickedUnvisited={clickedUnvisited}
                          loading={loading}
                        />
                      );
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
    </div>
  );
}

export default ShopBooking;

import "../Paginations/Paginations.css";
import { useApiAxios } from "api/base";
import { useAuth } from "contexts/AuthContext";
import { useCallback, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import ShopBookingComponent from "./ShopBookingComponent";
import booklist from "assets/img/booklist.png";

function ShopBooking({ shopId, itemsPerPage = 10 }) {
  const [auth] = useAuth();
  const [Day, setDay] = useState("");

  // paging
  const [, setItem] = useState(null);
  const [pageCount, setPageCount] = useState();
  const [page, setPage] = useState(0);

  //disabled
  const [loading, setLoading] = useState(false);

  // search
  const [query, setQuery] = useState();

  // 현재 테이블 카운트 수 변경
  const [tableCount, setTableCount] = useState(0);

  // get_bookingss
  const [{ data: getBookingData, error: getBookingError }, refetch] =
    useApiAxios(
      {
        url: `/booking/api/bookings/?shop_id=${shopId}&${
          query ? "&query=" + query : ""
        }`,
        method: "GET",
      },
      { manual: true }
    );

  // shopData - get
  const [{ data: shopData }, shopDataRefetch] = useApiAxios(
    {
      url: `/shop/api/shops/${shopId}/`,
      method: "GET",
    },
    { manual: true }
  );

  // 현재 테이블 수 수정
  const [{}, saveShop] = useApiAxios(
    {
      url: `/shop/api/shops/${shopId}/`,
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${auth.access}`,
      },
    },
    { manual: true }
  );

  // paging
  const fetchApplication = useCallback(
    async (newPage, newQuery = query) => {
      const params = {
        page: newPage,
        query: newQuery,
        day: Day,
      };

      const { data } = await refetch({ params });

      setPage(newPage);
      setPageCount(Math.ceil(data.count / itemsPerPage));
      setItem(data?.results);
    },
    [Day, query, refetch]
  );

  // get_bookings_refetch()
  useEffect(() => {
    refetch();
    shopDataRefetch();
    fetchApplication(1);
  }, []);

  useEffect(() => {
    setTableCount(shopData?.now_table_count);
  }, [shopData]);

  useEffect(() => {
    saveShop({
      data: { now_table_count: tableCount },
    });
  }, [tableCount]);

  const handlePage = (event) => {
    fetchApplication(event.selected + 1);
  };

  // booking - visit_status만 수정
  const [{ error: shopBookingsError }, saveBookingVisitState] = useApiAxios(
    {
      url: `/booking/api/bookings/`,
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${auth.access}`,
      },
    },
    { manual: true }
  );

  // 이름 / 휴대폰 뒷자리로 검색
  const search = (e) => {
    if (e.key === "Enter") {
      const { value } = e.target;
      setQuery(value);
      fetchApplication(1, query);
    }
    refetch();
  };

  const getQuery = (e) => {
    const { value } = e.target;
    setQuery(value);
  };

  // 날짜로 검색
  const searchDate = (e) => {
    e.preventDefault();
    fetchApplication(1, query);
  };

  return (
    <div>
      <div className="bg-white p-8 rounded-md w-[900px] m-auto">
        <div className="flex items-center justify-between pb-4 md:flex">
          <div className="flex flex-row">
            <img className="w-10 h-10 ml-2" src={booklist} alt="booklist" />
            <h2
              className="text-gray-600 px-4 py-1 font-semibold sm:flex-1 text-3xl md:text-2xl lg:text-2xl cursor-pointer"
              onClick={() =>
                window.location.replace(`/shop/${shopId}/bookings/`)
              }
            >
              예약자 명단
            </h2>
          </div>

          {getBookingError?.response?.status >= 400 && (
            <div className="text-red-400">
              데이터를 가져오는데 실패했습니다.
            </div>
          )}
          {shopBookingsError?.response?.status >= 400 && (
            <div className="text-red-400">
              데이터를 저장하는데 실패했습니다.
            </div>
          )}
          <div className="flex items-center justify-between">
            <div className="flex mr-2 mt-2">
              <span>
                <input
                  type="date"
                  name="day"
                  value={Day}
                  onChange={(e) => setDay(e.target.value)}
                  className="text-gray-700 placeholder:text-stone-300 w-full border border-stone-300 rounded-sm focus:outline-none text-center"
                />
              </span>
              <span>
                <button
                  onClick={searchDate}
                  className="text-gray-700 bg-stone-200 border border-stone-200 rounded-sm px-1 mx-1 mt-[1px]"
                >
                  검색
                </button>
              </span>
            </div>

            <div className="relative text-gray-600  mr-2">
              <input
                type="search"
                name="search"
                onChange={getQuery}
                onKeyPress={search}
                placeholder="이름/휴대폰 번호"
                className="bg-wihte h-9 px-2 pr-10 text-sm outline-none border-b-2 border-orange-400"
              />
              <button
                type="button"
                onClick={search}
                onChange={getQuery}
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
          {getBookingData && (
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
              <div className="inline-block min-w-full overflow-hidden">
                <table className="table-auto min-w-full whitespace-no-wrap">
                  <thead>
                    <tr>
                      <th className="px-5 py-3 border-b text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        No.
                      </th>
                      <th className="px-5 py-3 border-b text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        이름
                      </th>
                      <th className="px-5 py-3 border-b text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        휴대폰 번호
                      </th>
                      <th className="px-5 py-3 border-b text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        예약날짜
                      </th>
                      <th className="px-5 py-3 border-b text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        예약시간
                      </th>
                      <th className="px-5 py-3 border-b text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        예약 테이블 수
                      </th>
                      <th className="px-5 py-3 border-b text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        방문여부
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ */}
                    {getBookingData.results.map((book_obj, index) => {
                      return (
                        <ShopBookingComponent
                          index={index + 1}
                          key={book_obj.id}
                          book_obj={book_obj}
                          saveBookingVisitState={saveBookingVisitState}
                          loading={loading}
                          refetch={refetch}
                          tableCount={tableCount}
                          setTableCount={setTableCount}
                        />
                      );
                    })}
                  </tbody>
                </table>
              </div>
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
          )}
        </div>
      </div>
    </div>
  );
}

export default ShopBooking;

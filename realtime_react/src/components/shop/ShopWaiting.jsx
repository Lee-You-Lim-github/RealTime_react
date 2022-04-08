import { useApiAxios } from "api/base";
import React, { useCallback, useEffect, useState } from "react";
import ShopWaitingList from "./ShopWaitingList";
import "../Paginations/Paginations.css";
import ReactPaginate from "react-paginate";
import { useAuth } from "contexts/AuthContext";
import waitinglist from "assets/img/waitinglist.png";

function ShopWaiting({ shopId, itemsPerPage = 10 }) {
  const [auth] = useAuth();

  // paging
  const [, setItem] = useState(null);
  const [pageCount, setPageCount] = useState(1);
  const [page, setPage] = useState(1);

  // search
  const [query, setQuery] = useState();

  // 현재 테이블 카운트 수 변경
  const [tableCount, setTableCount] = useState(0);

  // waiting - get
  const [
    {
      data: shopWaitingData,
      loading: shopWaitingLoading,
      error: shopWaitingError,
    },
    refetch,
  ] = useApiAxios(
    {
      url: `/waiting/api/waitings/?ordering=wait_date&shop_id=${shopId}&wait_visit_status=${0}&wait_cancel=${0}&${
        query ? "&query=" + query : ""
      }`,
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

  // 대기여부 수정
  const [{ loading: shopWaitLoading, error: shopWaitError }, saveWaiting] =
    useApiAxios(
      {
        url: `/waiting/api/waiting/`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${auth.access}`,
        },
      },
      { manual: true }
    );

  useEffect(() => {
    refetch();
    shopDataRefetch();
  }, []);

  useEffect(() => {
    setTableCount(shopData?.now_table_count);
  }, [shopData]);

  // 페이징
  const fetchApplication = useCallback(
    async (newPage) => {
      const params = {
        page: newPage,
      };

      const { data } = await refetch({ params });

      setPage(newPage);

      setPageCount(Math.ceil(data.count / itemsPerPage));

      setItem(data?.results);
    },
    [refetch]
  );

  useEffect(() => {
    fetchApplication(1);
  }, []);

  const handlePage = (event) => {
    fetchApplication(event.selected + 1);
  };

  // 이름 / 휴대폰 뒷자리로 검색
  const search = (e) => {
    if (e.key === "Enter") {
      const { value } = e.target;
      setQuery(value);
      //   setReload((prevState) => !prevState);
    }
    refetch();
  };

  const getQuery = (e) => {
    const { value } = e.target;
    setQuery(value);
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
        {shopWaitingData && (
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full overflow-hidden">
              <table className="table-auto min-w-full whitespace-no-wrap">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      대기번호
                    </th>
                    <th className="px-5 py-3 border-b text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      이름
                    </th>
                    <th className="px-5 py-3 border-b text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      휴대폰 번호
                    </th>
                    <th className="px-5 py-3 border-b text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      테이블 수
                    </th>
                    <th className="px-5 py-3 border-b text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      대기 등록시간
                    </th>
                    <th className="px-5 py-3 border-b text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      입장 요청
                    </th>
                    <th className="px-5 py-3 border-b text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      입장 여부
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {shopWaitingData?.results?.map((waiting_obj) => (
                    <ShopWaitingList
                      key={waiting_obj.id}
                      waiting_obj={waiting_obj}
                      saveWaiting={saveWaiting}
                      refetch={refetch}
                      tableCount={tableCount}
                      setTableCount={setTableCount}
                    />
                  ))}
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
  );
}

export default ShopWaiting;

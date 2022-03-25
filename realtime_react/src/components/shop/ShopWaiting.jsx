import { useApiAxios } from "api/base";
import DebugStates from "components/DebugStates";
import React, { useCallback, useEffect, useState } from "react";
import ShopWaitingList from "./ShopWaitingList";
import "../Paginations/Paginations.css";
import ReactPaginate from "react-paginate";
import { useAuth } from "contexts/AuthContext";

function ShopWaiting({ shopId, itemsPerPage = 10 }) {
  const [auth] = useAuth();

  // paging
  const [, setItem] = useState(null);
  const [pageCount, setPageCount] = useState(1);
  const [page, setPage] = useState(1);

  // search
  const [query, setQuery] = useState();

  // waiting 데이터 불러오기
  const [
    {
      data: shopWaitingData,
      loading: shopWaitingLoading,
      error: shopWaitingError,
    },
    refetch,
  ] = useApiAxios(
    {
      url: `/waiting/api/waitings/?shop_id=${shopId}${
        query ? "&query=" + query : ""
      }`,
    },
    { manual: true }
  );

  useEffect(() => {
    refetch();
  }, []);

  // waiting : wait_visit_status만 수정
  const [
    { loading: shopWaitLoading, error: shopWaitError },
    saveWaitVisitStatus,
  ] = useApiAxios(
    {
      url: `/waiting/api/waiting/`,
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${auth.access}`,
      },
    },
    { manual: true }
  );

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
    <div>
      {shopWaitingData && (
        <div>
          <div>대기 현황</div>
          <div className="relative text-gray-600 shadow-md rounded-3xl mr-2">
            <input
              type="search"
              name="serch"
              onChange={getQuery}
              onKeyPress={search}
              placeholder="이름/휴대폰 번호"
              className="bg-wihte h-9 px-5 pr-10 rounded-full text-sm focus:outline-none border-2 border-gray-100"
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
          <span className="mx-10">대기번호</span>
          <span className="mx-10">이름</span>
          <span className="mx-10">휴대폰 번호</span>
          <span className="mx-10">테이블 수</span>
          <span className="mx-10">대기 등록시간</span>
          <span className="mx-10">입장 요청</span>
          <span className="mx-10">입장 여부</span>
          {shopWaitingData?.results?.map((shopwaiting) => (
            <ShopWaitingList
              key={shopwaiting.id}
              shopwaiting={shopwaiting}
              saveWaitVisitStatus={saveWaitVisitStatus}
              refetch={refetch}
            />
          ))}
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
  );
}

export default ShopWaiting;

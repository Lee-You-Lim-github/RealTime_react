import { useApiAxios } from "api/base";
import DebugStates from "components/DebugStates";
import { useAuth } from "contexts/AuthContext";
import useFieldValues from "hook/usefieldValues";
import { useCallback, useEffect, useState } from "react";
import ShopBookingComponent from "./ShopBookingComponent";

function ShopBooking({ shopId, bookingId }) {
  const [auth] = useAuth();

  //disabled
  const [visited, setVisited] = useState(false);

  // search
  const [query, setQuery] = useState();

  // reload
  const [reload, setReload] = useState(false);

  // 값 빼오기
  const [shop_array, setShop_array] = useState([]);

  // 데이터를 가져오는게 shopId === getBookingData.shop_id.id가 같은 것만 가져와야 함.

  //get_shop
  const [{ data: getShopData, loading, error }, shopRefetch] = useApiAxios(
    {
      url: `/shop/api/shops/${shopId}/`,
      method: "GET",
    },
    { manual: true }
  );

  useEffect(() => {
    shopRefetch();
  }, []);

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
      url: "/booking/api/bookings/",
      method: "GET",
      headers: {
        Authorization: `Bearer ${auth.access}`,
      },
    },
    { manual: true }
  );

  useEffect(() => {
    refetch();
  }, []);

  // 해당 매장의 예약자만 보이기
  useEffect(() => {
    const abc = getBookingData?.filter(
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
      url: `/booking/api/bookings/${bookingId}/`,
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${auth.access}`,
      },
    },
    { manual: true }
  );

  // 회원이 방문한 경우
  const clickedVisit = useCallback((booking_id) => {
    saveBookingVisitState({
      url: `/booking/api/bookings/${booking_id}/`,
      data: { visit_status: "1" },
    })
      .then((response) => {
        console.log(response.data.visit_status);
        refetch();
        setVisited(false);
      })
      .catch((error) => console.log(error));
  }, []);

  // 회원이 미방문한 경우
  const clickedUnvisited = useCallback((booking_id) => {
    saveBookingVisitState({
      url: `/booking/api/bookings/${booking_id}/`,

      data: { visit_status: "2" },
    })
      .then((response) => {
        console.log(response.data.visit_status);
        refetch();
        setVisited(false);
      })
      .catch((error) => console.log(error));
  }, []);

  // 이름 / 휴대폰 뒤자리로 검색
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
      <DebugStates
        // shop_array={shop_array}
        getBookingData={getBookingData}
        // getShopData={getShopData}
        // auth={auth}
      />

      <div class="bg-white p-8 rounded-md w-full">
        <div class=" flex items-center justify-between pb-6">
          <div>
            <h2 class="text-gray-600 font-semibold">예약현황</h2>
            <span class="text-xs">예약자명단</span>
          </div>
          <div class="flex items-center justify-between">
            <div class="flex bg-gray-50 items-center p-2 rounded-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-gray-400"
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
                class="bg-gray-50 outline-none ml-1 block "
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
            <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
              <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
                <table class="min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        No.
                      </th>
                      <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        이름
                      </th>
                      <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        휴대폰 번호
                      </th>
                      <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        예약날짜
                      </th>
                      <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        예약시간
                      </th>
                      <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        예약 테이블 수
                      </th>
                      <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        방문여부
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ */}
                    {shop_array?.map((shop_booking) => {
                      return (
                        <ShopBookingComponent
                          shop_booking={shop_booking}
                          clickedVisit={clickedVisit}
                          clickedUnvisited={clickedUnvisited}
                        />
                      );
                    })}
                  </tbody>
                </table>
                <div class="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
                  <span class="text-xs xs:text-sm text-gray-900">
                    Showing 1 to 4 of 50 Entries
                  </span>
                  <div class="inline-flex mt-2 xs:mt-0">
                    <button class="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-l">
                      Prev
                    </button>
                    &nbsp; &nbsp;
                    <button class="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-r">
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ShopBooking;

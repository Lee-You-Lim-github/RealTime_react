import { useApiAxios } from "api/base";
import DebugStates from "components/DebugStates";
import { useAuth } from "contexts/AuthContext";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function Myshop({ shopId }) {
  const [auth] = useAuth();

  // get_shop_data
  const [
    { data: myShopData, laoding: myShopLaoding, error: myShopError },
    refetch,
  ] = useApiAxios(
    {
      url: `/shop/api/shops/${shopId}/`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${auth.access}`,
      },
    },
    { manual: true }
  );

  useEffect(() => {
    refetch();
  }, [shopId]);

  // 현재 테이블 수 값 변경
  const [tableCount, setTableCount] = useState(0);

  // PATCH_shop: 현재 테이블 수, 휴일여부만 수정
  const [{ loading, error }, saveRuquest] = useApiAxios(
    {
      url: `/shop/api/shops/${shopId}/`,
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${auth.access}`,
      },
    },
    { manual: true }
  );

  useEffect(() => {
    setTableCount(myShopData?.now_table_count);
  }, [myShopData]);

  // 휴일을 눌렀을 때
  const handleHolidaySubmit = () => {
    saveRuquest({
      data: { holiday: "1" },
    })
      .then(() => {
        alert("휴일로 변경되었습니다.");
        refetch();
      })
      .catch((error) => console.log(error));
  };

  // 영업중을 눌렀을 때
  const handleNotHolidaySubmit = () => {
    saveRuquest({
      data: { holiday: "0" },
    })
      .then(() => {
        alert("영업 중으로 변경되었습니다.");
        refetch();
      })
      .catch((error) => console.log(error));
  };

  // Plus를 눌렀을 때(전체 테이블 수보다 추가할 수 없음.)
  const handlePlus = () => {
    setTableCount((prevTableCount) => {
      if (prevTableCount === myShopData.total_table_count) {
        return prevTableCount;
      } else {
        return prevTableCount + 1;
      }
    });
  };

  // Minus를 눌렀을 때(현재 테이블 수가 0 or -1이상일 경우 감소시킬 수 없음.)
  const handleMinus = () => {
    setTableCount((prevTableCount) => {
      if (prevTableCount > 0) {
        return prevTableCount - 1;
      } else {
        return prevTableCount;
      }
    });
  };

  // 변경된 now_table_count 값 저장
  useEffect(() => {
    saveRuquest({
      data: { now_table_count: tableCount },
    })
      .then((response) => {
        setTableCount(response.data.now_table_count);
      })
      .catch((error) => console.log(error));
  }, [tableCount]);

  return (
    <div>
      <ToastContainer />
      <div className="min-h-screen bg-violet-100 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-16 bg-clip-padding bg-opacity-60 border border-gray-200">
            <div className="max-w-md mx-auto">
              <div></div>
              <div className="divide-y divide-gray-200">
                <div className="pb-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <h2 className="text-3xl my-5">마이스토어</h2>
                  <button
                    type="button"
                    name="holiday"
                    onClick={handleHolidaySubmit}
                    className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                  >
                    휴일
                  </button>
                  <button
                    type="button"
                    name="not_holiday"
                    onClick={handleNotHolidaySubmit}
                    className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                  >
                    영업
                  </button>
                  {myShopData && (
                    <ul className="list-disc space-y-2">
                      <li className="flex items-start">
                        <p className="flex items-start">매장명</p>
                        <span className="h-6 flex items-center sm:h-7">
                          <svg
                            className="flex-shrink-0 h-5 w-5 text-cyan-500"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          ></svg>
                        </span>
                        <div className="ml-2">
                          <p>{myShopData.name}</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <p className="flex items-start">업종</p>
                        <span className="h-6 flex items-center sm:h-7">
                          <svg
                            className="flex-shrink-0 h-5 w-5 text-cyan-500"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          ></svg>
                        </span>
                        <div className="ml-2">
                          <p>{myShopData.category}</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <p className="flex items-start">주소</p>
                        <span className="h-6 flex items-center sm:h-7">
                          <svg
                            className="flex-shrink-0 h-5 w-5 text-cyan-500"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          ></svg>
                        </span>
                        <div className="ml-2">
                          <p>{myShopData.address}</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <p className="flex items-start">전화번호</p>
                        <span className="h-6 flex items-center sm:h-7">
                          <svg
                            className="flex-shrink-0 h-5 w-5 text-cyan-500"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          ></svg>
                        </span>
                        <div className="ml-2">
                          <p>{myShopData.telephone}</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <p className="flex items-start">영업시간</p>
                        <span className="h-6 flex items-center sm:h-7">
                          <svg
                            className="flex-shrink-0 h-5 w-5 text-cyan-500"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          ></svg>
                        </span>
                        <div className="ml-2">
                          <p>{myShopData.opening_hours}</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <p className="flex items-start">매장 테이블 수</p>
                        <span className="h-6 flex items-center sm:h-7">
                          <svg
                            className="flex-shrink-0 h-5 w-5 text-cyan-500"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          ></svg>
                        </span>
                        <div className="ml-2">
                          <p>{myShopData.total_table_count}</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <p className="flex items-start">현재 테이블 수</p>
                        <span className="h-6 flex items-center sm:h-7">
                          <svg
                            className="flex-shrink-0 h-5 w-5 text-cyan-500"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          ></svg>
                        </span>
                        <div className="ml-2">
                          <p>{tableCount}</p>
                          <button
                            type="button"
                            name="plus"
                            onClick={handlePlus}
                            className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                          >
                            +
                          </button>
                          <button
                            type="button"
                            name="minus"
                            onClick={handleMinus}
                            className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                          >
                            -
                          </button>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <p className="flex items-start">편의시설</p>
                        <span className="h-6 flex items-center sm:h-7">
                          <svg
                            className="flex-shrink-0 h-5 w-5 text-cyan-500"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          ></svg>
                        </span>
                        <div className="ml-2">
                          <p>{myShopData.conv_parking ? "주차장" : ""}</p>
                        </div>
                        <div className="ml-2">
                          <p>
                            {myShopData.conv_pet ? "애완동물 동반 가능" : ""}
                          </p>
                        </div>
                        <div className="ml-2">
                          <p>{myShopData.conv_wifi ? "WIFI" : ""}</p>
                        </div>
                        <div className="ml-2">
                          <p>{myShopData.conv_pack ? "포장 가능" : ""}</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <p className="flex items-start">공지사항</p>
                        <span className="h-6 flex items-center sm:h-7">
                          <svg
                            className="flex-shrink-0 h-5 w-5 text-cyan-500"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          ></svg>
                        </span>
                        <div className="ml-2">
                          <p>{myShopData.notice}</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <p className="flex items-start">매장 소개</p>
                        <span className="h-6 flex items-center sm:h-7">
                          <svg
                            className="flex-shrink-0 h-5 w-5 text-cyan-500"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          ></svg>
                        </span>
                        <div className="ml-2">
                          <p>{myShopData.intro}</p>
                        </div>
                      </li>

                      <li className="flex items-start">
                        <p className="flex items-start">사진</p>
                        <span className="h-6 flex items-center sm:h-7">
                          <svg
                            className="flex-shrink-0 h-5 w-5 text-cyan-500"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          ></svg>
                        </span>
                        <p className="ml-2">
                          {myShopData.photo && (
                            <img
                              src={myShopData.photo}
                              alt={myShopData.name}
                              className="rounded"
                            />
                          )}
                        </p>
                      </li>
                    </ul>
                  )}
                </div>
                <div className="pt-6 text-base leading-6 font-bold sm:text-lg sm:leading-7">
                  <p>
                    <Link
                      to={`/shop/${shopId}/edit`}
                      className="text-violet-600 hover:text-red-300"
                    >
                      {" "}
                      수정 &rarr;{" "}
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Myshop;

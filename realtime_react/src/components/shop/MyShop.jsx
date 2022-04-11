import { useApiAxios } from "api/base";
import LoadingIndicator from "components/LoadingIndicator";
import { useAuth } from "contexts/AuthContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import shoporange from "assets/img/shoporange.png";
import noimages from "assets/img/noimages.png";

function Myshop({ shopId }) {
  const [auth] = useAuth();
  const navigate = useNavigate();

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
      .catch();
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
      .catch();
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
      .catch();
  }, [tableCount]);

  // 매장소개 -- blank or "NULL"일 때 "등록된 매장소개가 없습니다."
  const intro_null = (a) => {
    if (a === "NULL" || !myShopData.intro) {
      return "등록된 매장소개가 없습니다.";
    } else {
      return `${myShopData?.intro}`;
    }
  };

  // 공지사항 -- blank or "NULL"일 때 "등록된 공지사항이 없습니다."
  const notice_null = (a) => {
    if (a === "NULL" || !myShopData.notice) {
      return "등록된 공지가 없습니다.";
    } else {
      return `${myShopData.notice}`;
    }
  };

  return (
    <div>
      {myShopData && (
        <section className="text-gray-800 body-font flex">
          <div className="flex flex-grow w-1/2 justify-center xl:justify-start lg:justify-start md:justify-start sm:justify-center">
            <div>
              {(myShopLaoding || loading) && (
                <LoadingIndicator>로딩 중...</LoadingIndicator>
              )}
              {myShopError?.response?.status >= 400 && (
                <div className="text-red-400 mt-10 ml-10">
                  데이터를 가져오는데 실패했습니다.
                </div>
              )}
              {error?.response?.status >= 400 && (
                <div className="text-red-400">변경에 실패하였습니다.</div>
              )}
            </div>

            {/* 타이틀 */}
            <div className="my-10">
              <div className="flex mb-10">
                <span>
                  <img className="w-8 h-8" src={shoporange} alt="shoporange" />
                </span>
                <span className="ml-1 text-3xl text-gray-900">마이스토어</span>

                <span>
                  <button
                    type="button"
                    name="not_holiday"
                    onClick={handleNotHolidaySubmit}
                    className="rounded w-2/2 ml-3 p-1 border-2 border-orange-400"
                  >
                    영업
                  </button>
                </span>
                <span>
                  <button
                    type="button"
                    name="holiday"
                    onClick={handleHolidaySubmit}
                    className="rounded w-2/2 mx-2 p-1 text-white bg-orange-400 border-2 border-orange-400"
                  >
                    휴업
                  </button>
                </span>
              </div>

              <div className="relative overflow-hidden">
                <div className="mx-5 mb-5 flex flex-row animate-slider">
                  {/* 매장 사진 */}
                  {!myShopData?.photo1 ? (
                    <img
                      className="rounded h-96"
                      src={noimages}
                      alt="no_images"
                    />
                  ) : (
                    <img
                      className="rounded h-96"
                      src={myShopData.photo1}
                      alt={myShopData.name}
                    />
                  )}

                  {!myShopData?.photo2 ? (
                    <img
                      className="rounded h-96"
                      src={noimages}
                      alt="no_images"
                    />
                  ) : (
                    <img
                      className="rounded h-96"
                      src={myShopData.photo2}
                      alt={myShopData.name}
                    />
                  )}

                  {!myShopData?.photo3 ? (
                    <img
                      className="rounded h-96"
                      src={noimages}
                      alt="no_images"
                    />
                  ) : (
                    <img
                      className="rounded h-96"
                      src={myShopData.photo3}
                      alt={myShopData.name}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="relativ flex flex-col w-1/2 mt-24 ml-20">
            <div className="items-left text-left flex justify-center flex-col md:justify-center">
              <ul className="list-disc space-y-5">
                <li className="flex items-start">
                  <p className="flex items-start xl:text-xl">매장명</p>
                  <span className="h-6 flex items-center sm:h-7">
                    <svg
                      className="flex-shrink-0 h-5 w-14 xl:w-16 lg:w-14 md:w-14 sm:w-14 text-cyan-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    ></svg>
                  </span>
                  <div className="ml-4 xl:text-xl">
                    <p>{myShopData.name}</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <p className="flex items-start xl:text-xl">업종</p>
                  <span className="h-6 flex items-center sm:h-7">
                    <svg
                      className="flex-shrink-0 h-5 w-16 xl:w-20 lg:w-16 md:w-16 sm:w-16 text-cyan-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    ></svg>
                  </span>
                  <div className="ml-5 xl:text-xl">
                    <p>{myShopData.category}</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <p className="flex items-start xl:text-xl">주소</p>
                  <span className="h-6 flex items-center sm:h-7">
                    <svg
                      className="flex-shrink-0 h-5 w-16 xl:w-20 lg:w-16 md:w-16 sm:w-16 text-cyan-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    ></svg>
                  </span>
                  <div className="ml-5 xl:text-xl">
                    <p>{myShopData.address}</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <p className="flex items-start xl:text-xl">전화번호</p>
                  <span className="h-6 flex items-center sm:h-7">
                    <svg
                      className="flex-shrink-0 h-5 w-12 xl:w-14 lg:w-12 md:w-12 sm:w-12 text-cyan-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    ></svg>
                  </span>
                  <div className="ml-2 xl:text-xl">
                    <p>{myShopData.telephone}</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <p className="flex items-start xl:text-xl">영업시간</p>
                  <span className="h-6 flex items-center sm:h-7">
                    <svg
                      className="flex-shrink-0 h-5 w-12 xl:w-14 lg:w-12 md:w-12 sm:w-12 text-cyan-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    ></svg>
                  </span>
                  <div className="ml-2 xl:text-xl">
                    <p>{myShopData.opening_hours}</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <p className="flex items-start xl:text-xl">매장 테이블 수</p>
                  <span className="h-6 flex items-center sm:h-7">
                    <svg
                      className="flex-shrink-0 h-5 w-3 text-cyan-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    ></svg>
                  </span>
                  <div className="ml-2 xl:text-xl">
                    <p>{myShopData.total_table_count}</p>
                  </div>
                </li>
                <li className="flex items-center">
                  <p className="flex items-start xl:text-xl">현재 테이블 수</p>
                  <span className="h-6 flex items-center sm:h-7">
                    <svg
                      className="flex-shrink-0 h-5 w-3 text-cyan-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    ></svg>
                  </span>
                  <div className="ml-2 xl:text-xl mr-7">
                    <p>
                      {tableCount}/{myShopData.total_table_count}
                    </p>
                  </div>
                  <button
                    type="button"
                    name="plus"
                    onClick={handlePlus}
                    className="mr-3 text-xl w-6 h-7 text-gray rounded focus:outline-none focus:shadow-outline bg-wihte border-2 border-orange-400"
                  >
                    +
                  </button>
                  <button
                    type="button"
                    name="minus"
                    onClick={handleMinus}
                    className="text-xl w-6 h-7 rounded focus:outline-none focus:shadow-outline text-white bg-orange-400 border-2 border-orange-400"
                  >
                    -
                  </button>
                </li>
                <li className="flex items-start">
                  <p className="flex items-start shrink-0 mr-5 xl:text-xl">
                    편의시설
                  </p>
                  <span className="h-6 flex items-center sm:h-7">
                    <svg
                      className="flex-shrink-0 h-5 w-8 xl:w-12 lg:w-8 md:w-9 sm:w-9 text-cyan-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    ></svg>
                  </span>
                  <div className="xl:text-xl">
                    <span>주차장{myShopData.conv_parking ? "👌" : "❌"}</span>
                    <span className="ml-2">
                      반려동물동반{myShopData.conv_pet ? "👌" : "❌"}
                    </span>
                    <div>
                      <span>와이파이{myShopData.conv_wifi ? "👌" : "❌"}</span>
                      <span className="ml-2">
                        포장{myShopData.conv_pack ? "👌" : "❌"}
                      </span>
                    </div>
                  </div>
                </li>
                <li className="flex items-start">
                  <p className="flex-container shrink-0 xl:text-xl">공지사항</p>
                  <span className="h-6 sm:h-7">
                    <svg
                      className="flex-shrink-0 h-5 w-12 xl:w-14 lg:w-12 md:w-12 sm:w-12 text-cyan-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    ></svg>
                  </span>
                  <div className="ml-2 xl:text-xl">
                    <p>{notice_null(myShopData?.notice)}</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <p className="flex items-start shrink-0 xl:text-xl">
                    매장소개
                  </p>
                  <span className="h-6 flex items-center sm:h-7">
                    <svg
                      className="flex-shrink-0 h-5 w-12 xl:w-14 lg:w-12 md:w-12 sm:w-12 text-cyan-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    ></svg>
                  </span>
                  <div className="ml-2 xl:text-xl">
                    <p>{intro_null(myShopData.intro)}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>
      )}
      <div className="flex justify-center pt-5 text-base leading-6 font-bold mb-10 sm:text-lg sm:leading-7">
        <button
          className="inline-flex text-white bg-orange-400 py-1 px-4 focus:outline-none border-2 border-orange-400 rounded 2xl:text-xl xl:text-xl lg:text-xl md:text-xl sm:text-sm"
          onClick={() => navigate(`/shop/${shopId}/edit/`)}
        >
          수정
        </button>
      </div>
    </div>
  );
}

export default Myshop;

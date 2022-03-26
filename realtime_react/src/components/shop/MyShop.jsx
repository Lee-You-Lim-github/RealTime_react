import { useApiAxios } from "api/base";
import LoadingIndicator from "components/LoadingIndicator";
import { useAuth } from "contexts/AuthContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import myshop from "assets/img/myshop.png";
import "./myshop.css";
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
        <section className="text-gray-600 body-font">
          <div className="flex flex-grow justify-center xl:justify-start lg:justify-start md:justify-start sm:justify-center">
            {/* 타이틀 */}
            <img
              className="mt-10 mb-8 w-8 h-8 lg:ml-14 md:ml-8 "
              src={myshop}
              alt="shop_booking"
            />
            <h1 className="text-3xl mt-10 ml-4 mb-4 title-font font-medium text-gray-900">
              마이스토어
            </h1>
            <button
              type="button"
              name="not_holiday"
              onClick={handleNotHolidaySubmit}
              className="text-sm h-8 px-2 mt-10 ml-8 mr-4 rounded focus:outline-none focus:shadow-outline text-gray bg-wihte hover:border-red-300 hover:text-red-300 border-2 border-violet-400"
            >
              영업
            </button>
            <button
              type="button"
              name="holiday"
              onClick={handleHolidaySubmit}
              className="text-sm h-8 mt-10 px-2 rounded focus:outline-none focus:shadow-outline text-white bg-violet-400 hover:bg-red-300 hover:border-red-300 border-2 border-violet-400"
            >
              휴업
            </button>
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
          </div>

          {/* 매장 사진 */}
          <div className=" relative flex flex-col 2xl:flex-row xl:flex-row lg:flex-row md:flex-row">
            <div className="mb-5 mt-5 2xl:w-1/3 xl:w-1/3 xl:ml-14 lg:w-2/5 lg:ml-12 md:w-2/5 w-5/6 md:ml-8 sm:mx-auto sm:mb-10">
              {myShopData?.photo1 ? (
                <img
                  src={myShopData.photo1}
                  alt={myShopData.name}
                  className="shopimage relative object-center rounded mx-auto my-auto"
                />
              ) : (
                <img
                  className="shopimage relative object-center rounded mx-auto"
                  src={noimages}
                  alt="no_images"
                />
              )}
              {myShopData?.photo1 ? (
                <img
                  src={myShopData.photo2}
                  alt={myShopData.name}
                  className="shopimage relative object-center rounded mx-auto my-auto"
                />
              ) : (
                <img
                  className="shopimage relative object-center rounded mx-auto"
                  src={noimages}
                  alt="no_images"
                />
              )}
              {myShopData?.photo1 ? (
                <img
                  src={myShopData.photo3}
                  alt={myShopData.name}
                  className="shopimage relative object-center rounded mx-auto my-auto"
                />
              ) : (
                <img
                  className="shopimage relative object-center rounded mx-auto"
                  src={noimages}
                  alt="no_images"
                />
              )}
            </div>

            <hr />
            {/* 매장상세 정보 */}
            <div className="items-left text-left flex px-12 xl:w-2/3 lg:w-3/5 lg:pl-14 lg:mt-0 md:w-3/5 md:pl-14 md:mt-0 flex-col md:justify-center sm:px-20">
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
                    className="mr-3 text-xl w-6 h-7 text-gray rounded focus:outline-none focus:shadow-outline bg-wihte hover:border-red-300 hover:text-red-300 border-2 border-violet-400"
                  >
                    +
                  </button>
                  <button
                    type="button"
                    name="minus"
                    onClick={handleMinus}
                    className="text-xl w-6 h-7 rounded focus:outline-none focus:shadow-outline text-white bg-violet-400 hover:bg-red-300 hover:border-red-300 border-2 border-violet-400"
                  >
                    -
                  </button>
                </li>
                <li className="flex items-start">
                  <p className="flex items-start mr-5 xl:text-xl">편의시설</p>
                  <span className="h-6 flex items-center sm:h-7">
                    <svg
                      className="flex-shrink-0 h-5 w-8 xl:w-12 lg:w-8 md:w-9 sm:w-9 text-cyan-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    ></svg>
                  </span>
                  <div className="mr-2 xl:text-xl">
                    <p>{myShopData.conv_parking ? "주차장" : ""}</p>
                  </div>
                  <div className="mr-2 xl:text-xl">
                    <p>{myShopData.conv_pet ? "애완동물 동반 가능" : ""}</p>
                  </div>
                  <div className="mr-2 xl:text-xl">
                    <p>{myShopData.conv_wifi ? "WIFI" : ""}</p>
                  </div>
                  <div className="mr-2 xl:text-xl">
                    <p>{myShopData.conv_pack ? "포장 가능" : ""}</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <p className="flex-container xl:text-xl">공지사항</p>
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
                  <p className="flex-container flex items-start xl:text-xl">
                    매장소개
                  </p>
                  <span className="h-6 flex items-center sm:h-7">
                    <svg
                      className="flex-shrink-0 h-5 w-11 xl:w-14 lg:w-11 md:w-12 sm:w-12 text-cyan-500"
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
          className="inline-flex text-white bg-violet-400 py-1 px-4 focus:outline-none hover:bg-red-300 hover:border-red-300 border-2 border-violet-400 rounded 2xl:text-xl xl:text-xl lg:text-xl md:text-xl sm:text-sm"
          onClick={() => navigate(`/shop/${shopId}/edit/`)}
        >
          수정
        </button>
      </div>
    </div>
  );
}

export default Myshop;

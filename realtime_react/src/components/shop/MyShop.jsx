import { useApiAxios } from "api/base";
import DebugStates from "components/DebugStates";
import { useAuth } from "contexts/AuthContext";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function Myshop({ shopId }) {
  const [auth] = useAuth();

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

  return (
    <div>
      <div className="min-h-screen bg-violet-100 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-16 bg-clip-padding bg-opacity-60 border border-gray-200">
            <div className="max-w-md mx-auto">
              <div></div>
              <div className="divide-y divide-gray-200">
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <h2>마이스토어</h2>
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
                        <p className="ml-2">
                          <p>{myShopData.name}</p>
                        </p>
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
                        <p className="ml-2">
                          <p>{myShopData.category}</p>
                        </p>
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
                        <p className="ml-2">
                          <p>{myShopData.address}</p>
                        </p>
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
                        <p className="ml-2">
                          <p>{myShopData.telephone}</p>
                        </p>
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
                        <p className="ml-2">
                          <p>{myShopData.opening_hours}</p>
                        </p>
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
                        <p className="ml-2">
                          <p>{myShopData.total_table_count}</p>
                        </p>
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
                        <p className="ml-2">
                          <p>{myShopData.now_table_count}</p>
                        </p>
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
                        <p className="ml-2">
                          <p>{myShopData.conv_parking ? "주차장" : ""}</p>
                        </p>
                        <p className="ml-2">
                          <p>
                            {myShopData.conv_pet ? "애완동물 동반 가능" : ""}
                          </p>
                        </p>
                        <p className="ml-2">
                          <p>{myShopData.conv_wifi ? "WIFI" : ""}</p>
                        </p>
                        <p className="ml-2">
                          <p>{myShopData.conv_pack ? "포장 가능" : ""}</p>
                        </p>
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
                        <p className="ml-2">
                          <p>{myShopData.notice}</p>
                        </p>
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
                        <p className="ml-2">
                          <p>{myShopData.intro}</p>
                        </p>
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
      <DebugStates myShopData={myShopData} />
    </div>
  );
}

export default Myshop;

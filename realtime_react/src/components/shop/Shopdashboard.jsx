import { useAuth } from "contexts/AuthContext";
import { Link } from "react-router-dom";
import Bookinginshopdashboard from "./Bookinginshopdashboard";
import Myshopinshopdashboard from "./Myshopinshopdashboard";
import Qnainshopdashboard from "./Qnainshopdashboard";
import Userinshopdashboard from "./Userinshopdashboard";
import Waitinginshopdashboard from "./Waitinginshopdashboard";
import shoporange from "assets/img/shoporange.png";
import { useApiAxios } from "api/base";
import { useEffect } from "react";

function Shopdashboard({ shopId }) {
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
    <>
      {myShopData && (
        <div>
          <div className="flex mt-8 mb-4 ml-48">
            <img className="w-12 h-12" src={shoporange} alt="shoporange" />
            <div className="text-3xl ml-4 mt-3">매장</div>
          </div>
          <div>
            <div className="flex justify-center">
              <div className="w-[364px] h-60 bg-orange-400 rounded-xl">
                <span className="text-white text-lg">내정보</span>
                <Userinshopdashboard />
                <Link
                  to={`/user/mypage/${auth.id}/edit/`}
                  className="border-2 border-white text-white hover text-sm text-right rounded p-1"
                >
                  수정
                </Link>
              </div>

              <div className="ml-3 w-[364px] h-60 bg-stone-400 rounded-xl">
                <Link
                  to={`/shop/myshop/${shopId}/`}
                  className="text-white text-lg mb-5"
                >
                  <div className="pb-3">마이스토어</div>
                </Link>
                <Myshopinshopdashboard shopId={shopId} />
              </div>
            </div>
            <div className="flex justify-center mt-5">
              <Link
                to={`/shop/${shopId}/bookings/`}
                className="w-60 h-60 bg-orange-400 rounded-xl"
              >
                <div className="text-white text-lg pb-3">예약현황</div>
                <Bookinginshopdashboard shopId={shopId} />
              </Link>
              <>
                <div className="ml-3 w-60 h-60 bg-stone-400 rounded-xl">
                  <Link to={`/shop/${shopId}/waitings/`} className="">
                    <div className="pb-3 text-white text-lg ">대기현황</div>
                    <Waitinginshopdashboard shopId={shopId} />
                  </Link>
                </div>
              </>
              <>
                <Link
                  to={`/user/${auth.id}/qna/`}
                  className="ml-3 w-60 h-60 bg-orange-400 rounded-xl"
                >
                  <div className="text-white text-lg pb-3">1:1문의</div>
                  <Qnainshopdashboard />
                </Link>
              </>
            </div>
          </div>
        </div>
      )}
      {!myShopData && (
        <div className="mr-80">
          <div className="text-xl mt-40">등록된 매장이 없어요</div>
          <Link
            to={`/shop/new/`}
            className="text-2xl text-orange-400 hover:text-stone-300 pt-6"
          >
            가맹점 등록하러 가기 🙌
          </Link>
        </div>
      )}
    </>
  );
}

export default Shopdashboard;

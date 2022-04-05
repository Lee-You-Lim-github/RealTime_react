import { useAuth } from "contexts/AuthContext";
import { Link } from "react-router-dom";
import Bookinginshopdashboard from "./Bookinginshopdashboard";
import Myshopinshopdashboard from "./Myshopinshopdashboard";
import Qnainshopdashboard from "./Qnainshopdashboard";
import Userinshopdashboard from "./Userinshopdashboard";
import Waitinginshopdashboard from "./Waitinginshopdashboard";

function Shopdashboard({ shopId }) {
  const [auth] = useAuth();

  return (
    <div>
      <h1>매장</h1>
      <div>
        <div className="flex justify-center">
          <div className="w-[364px] h-60 bg-orange-400 rounded-xl">
            <span className="text-white">내정보</span>
            <Userinshopdashboard />
            <Link
              to={`/user/mypage/${auth.id}/edit/`}
              className="border-2 border-white text-white hover text-sm text-right rounded p-1"
            >
              수정
            </Link>
          </div>

          <div className="ml-3 w-[364px] h-60 bg-stone-400 rounded-xl  ">
            <Link to={`/shop/myshop/${shopId}/`} className="text-white">
              마이스토어
            </Link>
            <Myshopinshopdashboard shopId={shopId} />
          </div>
        </div>
        <div className="flex justify-center mt-5">
          <Link
            to={`/shop/${shopId}/bookings/`}
            className="w-60 h-60 bg-orange-400 rounded-xl"
          >
            <div className="text-white">예약현황</div>
            <Bookinginshopdashboard shopId={shopId} />
          </Link>
          <>
            <div className="ml-3 w-60 h-60 bg-stone-400 rounded-xl">
              <Link to={`/shop/${shopId}/waitings/`} className="text-white">
                대기현황
              </Link>
              <Waitinginshopdashboard shopId={shopId} />
            </div>
          </>
          <>
            <Link
              to={`/user/${auth.id}/qna/`}
              className="ml-3 w-60 h-60 bg-orange-400 rounded-xl"
            >
              <div className="text-white">1:1문의</div>
              <Qnainshopdashboard />
            </Link>
          </>
        </div>
      </div>
    </div>
  );
}

export default Shopdashboard;

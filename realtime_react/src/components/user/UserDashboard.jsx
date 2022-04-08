import { Link } from "react-router-dom";
import { useAuth } from "contexts/AuthContext";
import UserInfo from "./UserInfo";
import BookingInfo from "./DashboardInfo/BookingInfo";
import PickInfo from "./DashboardInfo/PickInfo";
import ReviewInfo from "./DashboardInfo/ReviewInfo";
import QnAInfo from "./DashboardInfo/QnAInfo";
import UnWrittenReview from "./DashboardInfo/UnWrittenReview";
import WaitingInfo from "./DashboardInfo/WaitingInfo";
import user from "assets/img/adminuser.png";

function UserDashboard() {
  const [auth] = useAuth();

  return (
    <div>
      <div className="flex mt-8 mb-4 ml-48">
        <img className="w-12 h-12" src={user} alt="user" />
        <div className="text-3xl ml-4 mt-3">회원</div>
      </div>
      <div className="mb-5">
        <div className="flex justify-center mb-6">
          <div className="mx-3 w-60 h-60 bg-orange-400 rounded-xl">
            <h3 className="text-white mb-8 text-lg">내정보</h3>
            <div className="ml-3">
              <UserInfo />
              <Link
                to={`/user/mypage/${auth.id}/edit/`}
                className="border-2 border-white text-white hover text-sm text-right rounded p-1"
              >
                수정
              </Link>
            </div>
          </div>
          <div className="mx-3 w-60 h-60 bg-stone-400 rounded-xl">
            <h3 className="text-white mb-16 text-lg">예약내역</h3>
            <div className="text-gray-800">나의 방문예정 건 수</div>
            <Link
              to={`/user/${auth.id}/bookings/`}
              className="ml-3 w-60 h-60 text-3xl text-gray-800"
            >
              <BookingInfo /> 건
            </Link>
          </div>
          <div className="mx-3 w-60 h-60 bg-orange-400 rounded-xl">
            <h3 className="text-white mb-16 text-lg">대기내역</h3>
            <div className="text-gray-800">나의 대기 번호</div>
            <Link
              to={`/user/${auth.id}/waitings/`}
              className="ml-3 w-60 h-60 text-3xl text-gray-800"
            >
              <WaitingInfo /> 번
            </Link>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="mx-3 w-60 h-60 bg-stone-400 rounded-xl">
            <h3 className="text-white mb-16 text-lg">위시리스트</h3>
            <div className="text-gray-800">내가 찜한 매장</div>
            <Link
              to={`/user/${auth.id}/pick/`}
              className="ml-3 w-60 h-60 text-3xl text-gray-800"
            >
              <PickInfo /> 건
            </Link>
          </div>

          <div className="mx-3 w-60 h-60 bg-orange-400 rounded-xl">
            <h3 className="text-white mb-8">리뷰내역</h3>
            <div className="text-gray-800">작성하지 않은 리뷰</div>
            <Link
              to={`/user/${auth.id}/bookings/`}
              className="ml-3 w-60 h-60 text-3xl text-gray-800"
            >
              <UnWrittenReview /> 건
            </Link>

            <div className="mt-5 text-gray-800">내가 작성한 리뷰</div>
            <Link
              to={`/user/${auth.id}/review/`}
              className="ml-3 w-60 h-60 text-3xl text-gray-800"
            >
              <ReviewInfo /> 건
            </Link>
          </div>

          <div className="mx-3 w-60 h-60 bg-stone-400 rounded-xl">
            <h3 className="text-white mb-16">1:1문의</h3>
            <div className="text-gray-800">나의 1:1문의</div>
            <Link
              to={`/user/${auth.id}/qna/`}
              className="ml-3 w-60 h-60 text-3xl text-gray-800"
            >
              <QnAInfo /> 건
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;

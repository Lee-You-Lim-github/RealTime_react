import { Link } from "react-router-dom";
import { useAuth } from "contexts/AuthContext";
import UserInfo from "./UserInfo";
import BookingInfo from "./DashboardInfo/BookingInfo";
import PickInfo from "./DashboardInfo/PickInfo";
import ReviewInfo from "./DashboardInfo/ReviewInfo";
import QnAInfo from "./DashboardInfo/QnAInfo";
import UnWrittenReview from "./DashboardInfo/UnWrittenReview";

function UserDashboard() {
  const [auth] = useAuth();

  return (
    <div>
      <h1>회원</h1>
      <div>
        <div className="flex justify-center mb-6">
          <div className="mx-7 w-60 h-60 bg-orange-400">
            <h3 className="text-white">내정보</h3>
            <UserInfo />
            <Link
              to={`/user/mypage/${auth.id}/edit/`}
              className="border-2 border-white text-white hover text-sm text-right rounded p-1"
            >
              수정
            </Link>
          </div>
          <div className="mx-7 w-60 h-60 bg-stone-400">
            <h3 className="text-white">예약내역</h3>
            <div>방문 예정 건 수</div>
            <Link
              to={`/user/${auth.id}/bookings/`}
              className="text-white ml-3 w-60 h-60 text-3xl"
            >
              <BookingInfo /> 건
            </Link>
          </div>
          <div className="mx-7 w-60 h-60 bg-orange-400">
            <h3 className="text-white">대기내역</h3>
            <div>나의 대기 순서</div>
            <Link
              to={`/user/${auth.id}/waitings/`}
              className="text-white ml-3 w-60 h-60 text-3xl"
            >
              건
            </Link>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="mx-7 w-60 h-60 bg-stone-400">
            <h3 className="text-white">위시리스트</h3>
            <div>내가 찜 한 매장</div>
            <Link
              to={`/user/${auth.id}/pick/`}
              className="text-white ml-3 w-60 h-60 text-3xl"
            >
              <PickInfo /> 건
            </Link>
          </div>

          <div className="mx-7 w-60 h-60 bg-orange-400">
            <h3 className="text-white">리뷰내역</h3>
            <div>작성되지 않은 리뷰</div>
            <Link
              to={`/user/${auth.id}/bookings/`}
              className="text-white ml-3 w-60 h-60 text-3xl"
            >
              <UnWrittenReview /> 건
            </Link>

            <div>내가 작성한 리뷰</div>
            <Link
              to={`/user/${auth.id}/review/`}
              className="text-white ml-3 w-60 h-60 text-3xl"
            >
              <ReviewInfo /> 건
            </Link>
          </div>

          <div className="mx-7 w-60 h-60 bg-stone-400">
            <h3 className="text-white ">1:1문의</h3>
            <div>나의 1:1문의</div>
            <Link
              to={`/user/${auth.id}/qna/`}
              className="text-white ml-3 w-60 h-60 text-3xl"
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

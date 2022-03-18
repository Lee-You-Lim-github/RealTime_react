import { Link } from "react-router-dom";
import { useAuth } from "contexts/AuthContext";
import UserInfo from "./UserInfo";

function AdminDashboard() {
  const [auth] = useAuth();

  return (
    <div>
      <h1>회원</h1>
      <div>
        <div className="flex justify-center mb-6">
          <div className="mx-3 w-60 h-60 bg-orange-400">
            <h3 className="text-white">내정보</h3>
            <UserInfo />
            <Link
              to={`/user/mypage/${auth.id}/edit/`}
              className="border-2 border-white text-white hover text-sm text-right rounded p-1"
            >
              수정
            </Link>
          </div>
          <div className="mx-3 w-60 h-60 bg-stone-400">
            <h3 className="text-white">예약내역</h3>
            <Link
              to={`/user/${auth.id}/bookings/`}
              className="text-white ml-3 w-60 h-60"
            >
              건
            </Link>
          </div>
          <div className="text-white mx-3 w-60 h-60 bg-orange-400">
            대기내역
          </div>
        </div>

        <div className="flex justify-center">
          <div className="mx-3 w-60 h-60 bg-stone-400">
            <h3 className="text-white">위시리스트</h3>
            <Link
              to={`/user/${auth.id}/pick/`}
              className="text-white ml-3 w-60 h-60"
            >
              건
            </Link>
          </div>
          <Link
            to={`/user/${auth.id}/review/`}
            className="text-white mx-3 w-60 h-60 bg-orange-400"
          >
            리뷰내역
          </Link>
          <div className="text-white mx-3 w-60 h-60 bg-stone-400">1:1문의</div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;

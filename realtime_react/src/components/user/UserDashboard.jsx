import { Link } from "react-router-dom";
import { useAuth } from "contexts/AuthContext";
import UserInfo from "./UserInfo";

function AdminDashboard() {
  const [auth] = useAuth();

  return (
    <div>
      <h1>회원</h1>
      <div className="flex">
        <div className="ml-3 w-60 h-60 bg-orange-500">
          <h3 className="text-white">내정보</h3>
          <UserInfo />
          <Link
            to={`/user/mypage/${auth.id}/edit/`}
            className="border-2 border-gray-300 text-gray-300 hover text-sm text-right rounded p-1"
          >
            수정
          </Link>
        </div>
        <div className="ml-3 w-60 h-60 bg-orange-500">
          <h3 className="text-white">예약내역</h3>
          <Link
            to={`/user/${auth.id}/bookings/`}
            className="text-white ml-3 w-60 h-60 bg-orange-500"
          >
            건
          </Link>
        </div>

        <div className="text-white ml-3 w-60 h-60 bg-orange-500">대기내역</div>
        <div className="text-white ml-3 w-60 h-60 bg-orange-500">
          위시리스트
        </div>
        <div className="text-white ml-3 w-60 h-60 bg-orange-500">리뷰내역</div>
        <div className="text-white ml-3 w-60 h-60 bg-orange-500">1:1문의</div>
      </div>
    </div>
  );
}

export default AdminDashboard;

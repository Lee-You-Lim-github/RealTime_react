import { Link } from "react-router-dom";
import { useAuth } from "contexts/AuthContext";

function AdminDashboard() {
  const [auth] = useAuth();

  return (
    <div>
      <h1>회원</h1>
      <div className="flex">
        <div className="w-60 h-60 bg-orange-500">
          <h3>내정보</h3>
          <Link
            to={`/user/mypage/${auth.id}/edit/`}
            className="bg-gray-300 hover text-sm text-right rounded p-2"
          >
            수정
          </Link>
        </div>
        <Link
          to={`/user/${auth.id}/bookings/`}
          className="ml-3 w-60 h-60 bg-orange-500"
        >
          예약내역
        </Link>
        <div className="ml-3 w-60 h-60 bg-orange-500">대기내역</div>
        <div className="ml-3 w-60 h-60 bg-orange-500">위시리스트</div>
        <div className="ml-3 w-60 h-60 bg-orange-500">리뷰내역</div>
        <div className="ml-3 w-60 h-60 bg-orange-500">1:1문의</div>
      </div>
    </div>
  );
}

export default AdminDashboard;

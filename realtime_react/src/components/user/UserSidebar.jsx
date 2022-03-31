import { useAuth } from "contexts/AuthContext";
import { Link } from "react-router-dom";

function UserSidebar() {
  const [auth] = useAuth();

  return (
    <div className="flex flex-col w-full h-full bg-orange-400">
      <Link
        to={`/user/mypage/${auth.id}/edit/`}
        className="text-white text-xl my-5"
      >
        개인정보수정
      </Link>

      <Link
        to={`/user/${auth.id}/bookings/`}
        className="text-white text-xl my-5"
      >
        예약내역
      </Link>

      <Link
        to={`/user/${auth.id}/waitings/`}
        className="text-white text-xl my-5"
      >
        대기내역
      </Link>
      <Link to={`/user/${auth.id}/pick/`} className="text-white text-xl my-5">
        위시리스트
      </Link>
      <Link to={`/user/${auth.id}/review/`} className="text-white text-xl my-5">
        리뷰내역
      </Link>
      <Link to={`/user/${auth.id}/qna/`} className="text-white text-xl my-5">
        1:1문의
      </Link>
    </div>
  );
}

export default UserSidebar;

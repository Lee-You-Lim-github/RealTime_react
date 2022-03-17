import { Link } from "react-router-dom";

function UserSidebar({ userId }) {
  return (
    <div className="flex flex-col h-full bg-orange-400">
      <Link
        to={`/user/mypage/${userId}/edit/`}
        className="text-white text-xl my-5"
      >
        개인정보수정
      </Link>

      <Link
        to={`/user/${userId}/bookings/`}
        className="text-white text-xl my-5"
      >
        예약내역
      </Link>

      <div className="text-white text-xl my-5">대기내역</div>
      <div className="text-white text-xl my-5">위시리스트</div>
      <Link to={`/user/${userId}/review/`} className="text-white text-xl my-5">
        리뷰내역
      </Link>
      <div className="text-white text-xl my-5">1:1문의</div>
    </div>
  );
}

export default UserSidebar;

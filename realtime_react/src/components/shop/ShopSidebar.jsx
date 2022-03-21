import { useAuth } from "contexts/AuthContext";
import { Link } from "react-router-dom";

function ShopSidebar({ shopId }) {
  const [auth] = useAuth();
  return (
    <div>
      <div className="flex flex-col">
        <Link
          to={`/user/mypage/${auth.id}/edit/`}
          className="text-white text-xl mb-5 mt-5"
        >
          개인정보수정
        </Link>
        <Link
          to={`/shop/myshop/${shopId}/`}
          className="text-white text-xl mb-5"
        >
          마이스토어
        </Link>
        <Link
          to={`/shop/${shopId}/bookings/`}
          className="text-white text-xl mb-5"
        >
          예약현황
        </Link>
        <Link
          to={`/shop/${shopId}/waitings/`}
          className="text-white text-xl mb-5"
        >
          대기현황
        </Link>
        <Link to={`/user/${auth.id}/qna/`} className="text-white text-xl mb-5">
          1:1문의
        </Link>
      </div>
    </div>
  );
}

export default ShopSidebar;

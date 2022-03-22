import { Link } from "react-router-dom";

function Adminsidebar() {
  return (
    <div>
      <div className="flex flex-col">
        <Link to="/admin/user/" className="text-white text-xl mb-5 mt-5">
          회원관리
        </Link>
        <Link to="/admin/shop/" className="text-white text-xl mb-5">
          매장관리
        </Link>
        <Link to="/admin/booking/" className="text-white text-xl mb-5">
          예약관리
        </Link>
        <Link to="/admin/qna" className="text-white text-xl mb-5">
          1:1문의
        </Link>
      </div>
    </div>
  );
}

export default Adminsidebar;

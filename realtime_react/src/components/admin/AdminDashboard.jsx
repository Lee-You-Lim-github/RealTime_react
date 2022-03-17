import { Link } from "react-router-dom";

function AdminDashboard() {
  return (
    <div>
      <h1>관리자</h1>
      <div>
        <div className="flex justify-center">
          <Link
            to="/admin/user/"
            className="w-60 h-60 bg-orange-400 rounded-xl"
          >
            회원관리
          </Link>
          <Link
            to="/admin/shop/"
            className="ml-3 w-60 h-60 bg-stone-400 rounded-xl"
          >
            매장관리
          </Link>
        </div>
        <div className="flex justify-center mt-5">
          <Link
            to="/admin/booking/"
            className="w-60 h-60 bg-stone-400 rounded-xl"
          >
            예약관리
          </Link>
          <div className="ml-3 w-60 h-60 bg-orange-400 rounded-xl">1:1문의</div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;

import { Link } from "react-router-dom";

function AdminDashboard() {
  return (
    <div>
      <h1>관리자</h1>
      <div className="flex">
        <Link to="/admin/user/" className="w-60 h-60 bg-orange-500">
          회원관리
        </Link>
        <Link to="/admin/shop/" className="ml-3 w-60 h-60 bg-orange-500">
          매장관리
        </Link>
        <Link to="/admin/booking/" className="ml-3 w-60 h-60 bg-orange-500">
          예약관리
        </Link>
        <div className="ml-3 w-60 h-60 bg-orange-500">1:1문의</div>
      </div>
    </div>
  );
}

export default AdminDashboard;

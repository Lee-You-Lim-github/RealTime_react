import { Link } from "react-router-dom";
import Bookinginadmindashboard from "./Bookinginadmindashboard";
import Qnainadmindashboard from "./Qnainadmindashboard";
import Shopinadmindashboard from "./Shopinadmindashboard";
import Userinadmindashboard from "./Userinadmindashboard";
import Waitinginadmindashboard from "./Waitinginadmindashboard";

function AdminDashboard() {
  return (
    <div>
      <h1>관리자</h1>
      <div>
        <div className="flex justify-center">
          <Link
            to="/admin/user/"
            className="w-[364px] h-60 bg-orange-400 rounded-xl"
          >
            회원관리
            <Userinadmindashboard />
          </Link>
          <Link
            to="/admin/shop/"
            className="ml-3 w-[364px] h-60 bg-stone-400 rounded-xl"
          >
            매장관리
            <Shopinadmindashboard />
          </Link>
        </div>
        <div className="flex justify-center mt-5">
          <Link
            to="/admin/booking/"
            className="w-60 h-60 bg-orange-400 rounded-xl"
          >
            예약관리
            <Bookinginadmindashboard />
          </Link>
          <>
            <Link
              to="/admin/waiting/"
              className="ml-3 w-60 h-60 bg-stone-400 rounded-xl"
            >
              대기관리
              <Waitinginadmindashboard />
            </Link>
          </>
          <>
            <Link
              to="/admin/qna"
              className="ml-3 w-60 h-60 bg-orange-400 rounded-xl"
            >
              1:1문의
              <Qnainadmindashboard />
            </Link>
          </>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;

import { Link } from "react-router-dom";
import Bookinginadmindashboard from "./Bookinginadmindashboard";
import Qnainadmindashboard from "./Qnainadmindashboard";
import Shopinadmindashboard from "./Shopinadmindashboard";
import Userinadmindashboard from "./Userinadmindashboard";
import Waitinginadmindashboard from "./Waitinginadmindashboard";
import setting from "assets/img/setting.png";

function AdminDashboard() {
  return (
    <div>
      <div className="flex mt-8 mb-4 ml-48">
        <img className="w-12 h-12" src={setting} alt="setting" />
        <div className="text-3xl ml-4 mt-3">관리자</div>
      </div>
      <div className="mb-5">
        <div className="flex justify-center">
          <Link
            to="/admin/user/"
            className="w-[364px] h-60 bg-orange-400 rounded-xl"
          >
            <span className="text-white text-lg">회원관리</span>
            <Userinadmindashboard />
          </Link>
          <Link
            to="/admin/shop/"
            className="ml-3 w-[364px] h-60 bg-stone-400 rounded-xl"
          >
            <span className="text-white text-lg">매장관리</span>
            <Shopinadmindashboard />
          </Link>
        </div>
        <div className="flex justify-center mt-5">
          <Link
            to="/admin/booking/"
            className="w-60 h-60 bg-orange-400 rounded-xl"
          >
            <span className="text-white text-lg">예약관리</span>
            <Bookinginadmindashboard />
          </Link>
          <>
            <Link
              to="/admin/waiting/"
              className="ml-3 w-60 h-60 bg-stone-400 rounded-xl"
            >
              <span className="text-white text-lg">대기관리</span>
              <Waitinginadmindashboard />
            </Link>
          </>
          <>
            <Link
              to="/admin/qna"
              className="ml-3 w-60 h-60 bg-orange-400 rounded-xl"
            >
              <span className="text-white text-lg">1:1문의</span>
              <Qnainadmindashboard />
            </Link>
          </>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;

import { Link } from "react-router-dom";
import adminuser from "assets/img/adminuser.png";
import adminshop from "assets/img/adminshop.png";
import adminbook from "assets/img/adminbook.png";
import adminwaitnotes from "assets/img/adminwaitnotes.png";
import adminqna from "assets/img/adminqna.png";

function Adminsidebar() {
  return (
    <div>
      <div className="flex flex-col">
        <Link to="/admin/user/" className="text-white text-xl mb-10">
          <div className="flex">
            <img src={adminuser} alt="adminuser" className="w-8 h-8 ml-7" />
            <span className="ml-4 mt-1">회원관리</span>
          </div>
        </Link>
        <Link to="/admin/shop/" className="text-white text-xl mb-10">
          <div className="flex">
            <img src={adminshop} alt="adminshop" className="w-8 h-8 ml-7" />
            <span className="ml-4 mt-1">매장관리</span>
          </div>
        </Link>
        <Link to="/admin/booking/" className="text-white text-xl mb-10">
          <div className="flex">
            <img src={adminbook} alt="adminbook" className="w-8 h-8 ml-7" />
            <span className="ml-4 mt-1">예약관리</span>
          </div>
        </Link>
        <Link to="/admin/waiting/" className="text-white text-xl mb-10">
          <div className="flex">
            <img
              src={adminwaitnotes}
              alt="adminwaitnotes"
              className="w-9 h-9 ml-7"
            />
            <span className="ml-4 mt-1">대기관리</span>
          </div>
        </Link>
        <Link to="/admin/qna" className="text-white text-xl mb-5">
          <div className="flex">
            <img src={adminqna} alt="adminqna" className="w-9 h-9 ml-7" />
            <span className="ml-4 mt-1">1:1문의</span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Adminsidebar;

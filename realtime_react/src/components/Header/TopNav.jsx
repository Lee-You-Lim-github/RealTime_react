import { NavLink } from "react-router-dom";
import "./TopNav.css";

function TopNav() {
  return (
    <div className="bg-red-200">
      <div className="header">
        <div className="flex place-content-between gap-3 border-b-4 border-red-300">
          <NavLink to="/" className="px-4 py-3 mt-2 text-4xl">
            지금어때
          </NavLink>
          <div className="flex text-xl mr-2">
            <MyLink to="/blog/">예약현황</MyLink>
            <MyLink to="/accounts/login/">로그인</MyLink>
          </div>
        </div>
      </div>
    </div>
  );
}

function MyLink({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        baseClassName + " " + (isActive ? "border-b-4 border-red-400" : "")
      }
    >
      {children}
    </NavLink>
  );
}

const baseClassName = "px-4 pt-6 mt-4 font-semibold hover:text-red-500";

export default TopNav;

import { useApiAxios } from "api/base";
import DebugStates from "components/DebugStates";
import { useAuth } from "contexts/AuthContext";
import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./TopNav.css";

function TopNav() {
  const [auth, , , logout] = useAuth();
  const navigate = useNavigate();

  const authority_topnavi = (a) => {
    if (auth.authority === "0") {
      return true;
    } else {
      return false;
    }
  };

  const [{ data, loading, error }, refetch] = useApiAxios(
    {
      url: `/accounts/api/users/${auth.id}/`,
      method: "GET",
      Headers: {
        Authorization: `Bearer ${auth.access}`,
      },
    },
    { manual: true }
  );

  useEffect(() => {
    refetch().then((response) => console.log(response.data));
  }, [auth.id]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="bg-red-200">
      <div className="header">
        <div className="flex place-content-between gap-3 border-b-4 border-red-300">
          <NavLink to="/" className="px-4 py-3 mt-2 text-4xl">
            지금어때
          </NavLink>
          <div className="flex text-xl mr-2">
            {!auth.isLoggedIn && (
              <>
                <MyLink to="/accounts/login/">예약현황</MyLink>
                <MyLink to="/accounts/login/">로그인</MyLink>
              </>
            )}
            {/* 유저만 보이는 TopNavi */}
            {auth.isLoggedIn && authority_topnavi(auth.authority) && (
              <>
                <MyLink to={`/user/mypage/${data?.id}/`}>
                  {auth.nickname} 님
                </MyLink>
                <MyLink to={`/user/bookings/${data?.id}`}>예약현황</MyLink>
                <button onClick={handleLogout} className={baseClassName}>
                  로그아웃
                </button>
              </>
            )}
            {/* 매장만 보이는 TopNavi */}
            {auth.isLoggedIn && !authority_topnavi(auth.authority) && (
              <>
                <MyLink to={`/user/mypage/${data?.id}/`}>
                  {auth.nickname} 님
                </MyLink>
                <MyLink to={`/shop/${data?.shop_set[0]}/bookings/`}>
                  매장 예약현황
                </MyLink>
                <MyLink to={`/shop/myshop/${data?.shop_set[0]}/`}>
                  마이스토어
                </MyLink>
                <button onClick={handleLogout} className={baseClassName}>
                  로그아웃
                </button>
              </>
            )}
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

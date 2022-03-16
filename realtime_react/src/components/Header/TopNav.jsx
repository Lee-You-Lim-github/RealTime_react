import { useApiAxios } from "api/base";
import { useAuth } from "contexts/AuthContext";
import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./TopNav.css";
import Logo from "assets/img//LogoSample.png";

function TopNav() {
  const [auth, , , logout] = useAuth();
  const navigate = useNavigate();

  const authority_topnavi = (a) => {
    if (a === "0") {
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
    refetch().then();
  }, [auth.id]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleLogin = () => {
    navigate("/accounts/login/");
  };

  const handleJoin = () => {
    navigate("/shop/new/");
  };

  var nav = document.getElementsByClassName("navigation");

  window.onscroll = function sticky() {
    if (window.pageYOffset > nav[0].offsetTop) {
      nav[0].classList.add("nav");
    } else {
      nav[0].classList.remove("nav");
    }
  };

  return (
    <div className="bg-red-200">
      <div className="header">
        <div className="navigation">
          <div className="flex place-content-between gap-3 ">
            <NavLink to="/" className="px-4 py-3 mt-2 text-4xl">
              <img src={Logo} alt="LOGO" className="w-28 h-10" />
            </NavLink>
            <div className="flex text-xl mr-2">
              {/* 비회원이 로그인 시 */}
              {!auth.isLoggedIn && (
                <>
                  <MyLink to="/accounts/login/">로그인</MyLink>
                </>
              )}
              {/* 회원이 로그인 시 */}
              {auth.isLoggedIn &&
                !auth.is_superuser &&
                authority_topnavi(auth.authority) && (
                  <>
                    <MyLink to={`/user/mypage/${data?.id}/`}>
                      {auth.nickname} 님
                    </MyLink>
                    <MyLink to={`/user/${data?.id}/bookings/`}>
                      예약/대기현황
                    </MyLink>
                    <span>
                      <button onClick={handleLogout} className={baseClassName}>
                        로그아웃
                      </button>
                    </span>
                  </>
                )}
              {/* 사엽자가 로그인 시 */}
              {auth.isLoggedIn &&
                !auth.is_superuser &&
                !authority_topnavi(auth.authority) && (
                  <>
                    <MyLink to={`/user/mypage/${data?.id}/`}>
                      {" "}
                      {/* 관리자 대쉬보드 이동으로 변경하기 */} {auth.nickname}{" "}
                      님
                    </MyLink>

                    {/* 매장이 등록되지 않은 경우 */}
                    {/* {data?.shop_set.length === 0 && (
                      <>
                        <MyLink to={`/shop/new/`}>가맹점 가입</MyLink>
                        <span>
                          <button
                            onClick={handleJoin}
                            className={baseClassName}
                          >
                            마이스토어
                          </button>
                        </span>
                      </>
                    )} */}
                    {/* 매장이 등록된 경우 */}
                    {/* {data?.shop_set.length === 1 && (
                      <>
                        <MyLink to={`/shop/${data?.shop_set[0]}/bookings/`}>
                          매장 예약현황
                        </MyLink>
                        <MyLink to={`/shop/myshop/${data?.shop_set[0]}/`}>
                          마이스토어
                        </MyLink>
                      </>
                    )} */}
                    <span>
                      <button onClick={handleLogout} className={baseClassName}>
                        로그아웃
                      </button>
                    </span>
                  </>
                )}
              {/* 관리자로 로그인 */}
              {auth.isLoggedIn && auth.is_superuser && (
                <>
                  <MyLink to="/admin/user/">관리자님</MyLink>
                  <span>
                    <button onClick={handleLogout} className={baseClassName}>
                      로그아웃
                    </button>
                  </span>
                </>
              )}
            </div>
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

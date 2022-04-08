import { useApiAxios } from "api/base";
import { useAuth } from "contexts/AuthContext";
import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./TopNav.css";
import Logo from "assets/img//logo1.png";

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
    <div className="">
      <div className="header">
        <div className="navigation">
          <div className="flex place-content-between gap-3 mr-60">
            <NavLink to="/" className="ml-2 text-4xl">
              <img src={Logo} alt="LOGO" className="mt-2 ml-64 w-18 h-16" />
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
                    <MyLink to={`/user/${data?.id}/dashboard/`}>
                      {auth.nickname} 님
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
                    <MyLink to={`/shop/${data?.shop_set[0]}/dashboard/`}>
                      {" "}
                      {auth.nickname} 님
                    </MyLink>
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
                  <MyLink to="/admin/dashboard/">관리자님</MyLink>
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
        <hr className="a" />
      </div>
    </div>
  );
}

function MyLink({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        baseClassName + " " + (isActive ? "border-b-2 border-orange-400" : "")
      }
    >
      {children}
    </NavLink>
  );
}

const baseClassName = "px-4 pt-12 font-semibold hover:text-orange-500";

export default TopNav;

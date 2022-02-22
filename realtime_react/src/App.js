import "./App.css";
import { Route, Routes } from "react-router-dom";
import TopNav from "components/Header/TopNav";
import PageLogin from "pages/accounts/PageLogin";
import PageUserJoin from "pages/accounts/PageUserJoin";
import PageShopForm from "pages/shop/PageShopForm";
import PageIndex from "pages/PageIndex";
import PageUserInfo from "pages/user/PageUserInfo";
import PageBookingForm from "pages/booking/PageBookingForm";
import PageMyShop from "pages/shop/PageMyShop";
import PageShopDetail from "pages/shop/PageShopDetail";
import PageShopBooking from "pages/shop/PageShopBooking";
import PageUserBooking from "pages/user/PageUserBooking";
import { useAuth } from "contexts/AuthContext";
import PageUserEdit from "pages/user/PageUserEdit";
import PageAdminShop from "pages/admin/PageAdminShop";
import PageAdminBooking from "pages/admin/PageAdminBooking";
import PageAdminUser from "pages/admin/PageAdminUser";
import PageShopNot from "pages/notfound/PageShopNot";

function App() {
  const [auth, , login, logout] = useAuth();

  const authority_topnavi = (a) => {
    if (a === "0") {
      return true;
    } else {
      return false;
    }
  };

  if (auth.isLoggedIn) {
    // 관리자로 로그인 시
    if (auth.is_superuser) {
      return (
        <>
          <TopNav />
          <Routes>
            <Route path="/" element={<PageIndex />} />
          </Routes>
          <div className="App">
            <Routes>
              <Route path="/admin/user/" element={<PageAdminUser />} />
              <Route path="/admin/shop/" element={<PageAdminShop />} />
              <Route path="/admin/booking/" element={<PageAdminBooking />} />
            </Routes>
          </div>
        </>
      );
    } else {
      // 유저가 로그인 시
      if (authority_topnavi(auth.authority)) {
        return (
          <>
            <TopNav />
            <Routes>
              <Route path="/" element={<PageIndex />} />
            </Routes>
            <div className="App">
              <Routes>
                <Route path="/account/userjoin/" element={<PageUserJoin />} />
                <Route
                  path="/shop/:shopId/booking/new/"
                  element={<PageBookingForm />}
                />
                <Route path="/shop/:shopId/" element={<PageShopDetail />} />
                <Route
                  path="/user/mypage/:userId/"
                  element={<PageUserInfo />}
                />
                <Route
                  path="/user/mypage/:userId/edit/"
                  element={<PageUserEdit />}
                />
                <Route
                  path="/user/bookings/:userId/"
                  element={<PageUserBooking />}
                />
              </Routes>
            </div>
          </>
        );
      }
      // 사업자로 로그인 시
      else {
        return (
          <>
            <TopNav />
            <Routes>
              <Route path="/" element={<PageIndex />} />
            </Routes>
            <div className="App">
              <Routes>
                <Route path="/account/userjoin/" element={<PageUserJoin />} />
                <Route path="/shop/new/" element={<PageShopForm />} />
                <Route path="/shop/:shopId/" element={<PageShopNot />} />
                <Route path="/shop/:shopId/edit/" element={<PageShopForm />} />
                <Route path="/shop/myshop/:shopId/" element={<PageMyShop />} />
                <Route
                  path="/shop/:shopId/bookings/"
                  element={<PageShopBooking />}
                />
                <Route
                  path="/user/mypage/:userId/"
                  element={<PageUserInfo />}
                />
                <Route
                  path="/user/mypage/:userId/edit/"
                  element={<PageUserJoin />}
                />
              </Routes>
            </div>
          </>
        );
      }
    }

    // 비회원인 경우
  } else {
    console.log("===================================");
    console.log(auth.isLoggedIn);
    return (
      <>
        <TopNav />
        <Routes>
          <Route path="/" element={<PageIndex />} />
        </Routes>
        <div className="App">
          <Routes>
            <Route path="/accounts/login/" element={<PageLogin />} />
            <Route path="/account/userjoin/" element={<PageUserJoin />} />
            <Route path="/shop/:shopId/" element={<PageShopDetail />} />
          </Routes>
        </div>
      </>
    );
  }

  // return (
  //   <>
  //     <TopNav />
  //     <Routes>
  //       <Route path="/" element={<PageIndex />} />
  //     </Routes>
  //     <div className="App">
  //       <Routes>
  //         <Route path="/accounts/login/" element={<PageLogin />} />
  //         <Route path="/account/userjoin/" element={<PageUserJoin />} />
  //         <Route path="/booking/:shopId/new/" element={<PageBookingForm />} />
  //         <Route path="/shop/new/" element={<PageShopForm />} />
  //         <Route path="/shop/:shopId/" element={<PageShopDetail />} />
  //         <Route path="/shop/:shopId/edit/" element={<PageShopForm />} />
  //         <Route path="/shop/myshop/:shopId" element={<PageMyShop />} />
  //         <Route path="/shop/:shopId/bookings/" element={<PageShopBooking />} />
  //         <Route path="/user/mypage/:userId/" element={<PageUserInfo />} />
  //         <Route path="/user/mypage/:userId/edit/" element={<PageUserJoin />} />
  //         <Route path="/user/bookings/:userId/" element={<PageUserBooking />} />
  //       </Routes>
  //     </div>
  //   </>
  // );
}

export default App;

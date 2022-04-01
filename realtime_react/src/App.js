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
import PageUserDashboard from "pages/user/PageUserDashboard";
import { useAuth } from "contexts/AuthContext";
import PageUserEdit from "pages/user/PageUserEdit";
import PageAdminShop from "pages/admin/PageAdminShop";
import PageAdminBooking from "pages/admin/PageAdminBooking";
import PageAdminUser from "pages/admin/PageAdminUser";
import PageShopNot from "pages/notfound/PageShopNot";
import PageNotAccess from "pages/notfound/PageNotAccess";
import PageNotLogin from "pages/notfound/PageNotLogin";
import Footer from "components/Footer/Footer";
import PageAdminDashboard from "pages/admin/PageAdminDashboard";
import PageShopWaiting from "pages/shop/PageShopWaiting";
import PageReviewForm from "pages/review/PageReviewForm";
import PageReivewList from "pages/review/PageReivewList";
import PageShopDashboard from "pages/shop/PageShopDashboard";
import PagePickList from "pages/pick/PagePickList";
import PageQnaList from "pages/qna/PageQnaList";
import PageQnaDetail from "pages/qna/PageQnaDetail";
import PageQnaForm from "pages/qna/PageQnaForm";
import PageAdminQnaList from "pages/qna/PageAdminQnaList";
import PageAdminQnaDetail from "pages/qna/PageAdminQnaDetail";
import PageAdminQnaForm from "pages/qna/PageAdminQnaForm";
import PageAdminwaitingList from "pages/waiting/PageAdminwaitingList";
import PageUserWaiting from "pages/user/PageUserWaiting";

function App() {
  const [auth] = useAuth();

  const authority_app = (authority) => {
    if (authority === "0") {
      return true;
    } else {
      return false;
    }
  };

  // 관리자 pagenotfound 컴포넌트
  function NotAccess() {
    return (
      <Routes>
        <Route path="/admin/user/" element={<PageNotAccess />} />
        <Route path="/admin/shop/" element={<PageNotAccess />} />
        <Route path="/admin/booking/" element={<PageNotAccess />} />
      </Routes>
    );
  }

  // 권한별 보여지는 페이지
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
              <Route
                path="/admin/dashboard/"
                element={<PageAdminDashboard />}
              />
              <Route path="/admin/user/" element={<PageAdminUser />} />
              <Route path="/admin/shop/" element={<PageAdminShop />} />
              <Route path="/admin/booking/" element={<PageAdminBooking />} />
              <Route path="/accounts/login/" element={<PageNotAccess />} />
              <Route path="/accounts/userjoin/" element={<PageNotAccess />} />
              <Route path="/shop/new/" element={<PageNotAccess />} />
              <Route path="/shop/:shopId/" element={<PageShopDetail />} />
              <Route path="/shop/:shopId/edit/" element={<PageNotAccess />} />
              <Route
                path="/shop/:shopId/booking/new/"
                element={<PageNotAccess />}
              />
              <Route
                path="/shop/:shopId/bookings/"
                element={<PageNotAccess />}
              />
              <Route path="/user/mypage/:userId/" element={<PageNotAccess />} />
              <Route
                path="/user/mypage/:userId/edit/"
                element={<PageNotAccess />}
              />
              <Route
                path="/user/:userId/bookings/"
                element={<PageNotAccess />}
              />

              {/* 관리자 qna */}
              <Route path="/admin/qna/" element={<PageAdminQnaList />} />
              <Route
                path="/admin/:userId/qna/:qnaId/"
                element={<PageAdminQnaDetail />}
              />
              <Route
                path="/admin/:userId/qna/:qnaId/answer"
                element={<PageAdminQnaForm />}
              />

              {/* 관리자 waiting */}

              <Route
                path="/admin/waiting/"
                element={<PageAdminwaitingList />}
              />
            </Routes>
          </div>
          <Footer />
        </>
      );
    } else {
      // 유저가 로그인 시
      if (authority_app(auth.authority)) {
        return (
          <>
            <TopNav />
            <Routes>
              <Route path="/" element={<PageIndex />} />
            </Routes>
            <div className="App">
              <Routes>
                <Route
                  path="/user/:userId/dashboard/"
                  element={<PageUserDashboard />}
                />
                <Route path="/accounts/userjoin/" element={<PageUserJoin />} />
                <Route path="/shop/new/" element={<PageNotAccess />} />
                <Route path="/shop/:shopId/" element={<PageShopDetail />} />
                <Route path="/shop/:shopId/edit/" element={<PageNotAccess />} />
                <Route
                  path="/shop/:shopId/booking/new/"
                  element={<PageBookingForm />}
                />
                <Route
                  path="/shop/:shopId/bookings/"
                  element={<PageNotAccess />}
                />
                <Route
                  path="/shop/myshop/:shopId/"
                  element={<PageNotAccess />}
                />
                <Route
                  path="/user/mypage/:userId/"
                  element={<PageUserInfo />}
                />
                <Route
                  path="/user/mypage/:userId/edit/"
                  element={<PageUserEdit />}
                />
                <Route
                  path="/user/:userId/bookings/"
                  element={<PageUserBooking />}
                />
                <Route
                  path="/user/:userId/waitings/"
                  element={<PageUserWaiting />}
                />
                <Route path="/user/:userId/pick/" element={<PagePickList />} />
                <Route
                  path="/user/:userId/:type/:Id/review/new/"
                  element={<PageReviewForm />}
                />
                <Route
                  path="/user/:userId/review/"
                  element={<PageReivewList />}
                />
                <Route path="/user/:userId/qna/" element={<PageQnaList />} />
                <Route
                  path="/user/:userId/qna/:qnaId/"
                  element={<PageQnaDetail />}
                />
                <Route path="/user/:userId/qna/new" element={<PageQnaForm />} />
              </Routes>
              <NotAccess />
            </div>
            <Footer />
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
                <Route path="/accounts/userjoin/" element={<PageUserJoin />} />
                <Route path="/shop/new/" element={<PageShopForm />} />
                <Route path="/shop/:shopId/" element={<PageShopDetail />} />
                <Route
                  path="/shop/:shopId/dashboard/"
                  element={<PageShopDashboard />}
                />
                <Route path="/shop/:shopId/edit/" element={<PageShopForm />} />
                <Route
                  path="/shop/:shopId/booking/new/"
                  element={<PageShopNot />}
                />
                <Route
                  path="/shop/:shopId/bookings/"
                  element={<PageShopBooking />}
                />
                <Route
                  path="/shop/:shopId/waitings/"
                  element={<PageShopWaiting />}
                />
                <Route path="/shop/myshop/:shopId/" element={<PageMyShop />} />
                <Route
                  path="/user/mypage/:userId/"
                  element={<PageUserInfo />}
                />
                <Route
                  path="/user/mypage/:userId/edit/"
                  element={<PageUserEdit />}
                />
                <Route
                  path="/user/:userId/bookings/"
                  element={<PageShopNot />}
                />
                <Route path="/user/:userId/qna/" element={<PageQnaList />} />
                <Route
                  path="/user/:userId/qna/:qnaId/"
                  element={<PageQnaDetail />}
                />
                <Route path="/user/:userId/qna/new" element={<PageQnaForm />} />
              </Routes>
              <NotAccess />
              <Footer />
            </div>
          </>
        );
      }
    }
    // 비회원인 경우
  } else {
    return (
      <>
        <TopNav />
        <Routes>
          <Route path="/" element={<PageIndex />} />
        </Routes>
        <div className="App">
          <Routes>
            <Route path="/accounts/login/" element={<PageLogin />} />
            <Route path="/accounts/userjoin/" element={<PageUserJoin />} />
            <Route path="/shop/new/" element={<PageNotAccess />} />
            <Route path="/shop/:shopId/" element={<PageNotLogin />} />
            <Route path="/shop/:shopId/edit/" element={<PageNotAccess />} />
            <Route path="/shop/:shopId/bookings/" element={<PageNotAccess />} />
            <Route path="/shop/myshop/:shopId/" element={<PageNotAccess />} />
            <Route path="/user/mypage/:userId/" element={<PageNotAccess />} />
            <Route
              path="/user/mypage/:userId/edit/"
              element={<PageNotAccess />}
            />
            <Route path="/user/:userId/bookings/" element={<PageNotAccess />} />
          </Routes>
          <NotAccess />
          <Footer />
        </div>
      </>
    );
  }
}

export default App;

import "./App.css";
import { Route, Routes } from "react-router-dom";
import TopNav from "components/Header/TopNav";
import PageLogin from "pages/accounts/PageLogin";
import PageUserJoin from "pages/accounts/PageUserJoin";
import PageShopForm from "pages/shop/PageShopForm";
import PageIndex from "pages/PageIndex";
import PageUserInfo from "pages/user/PageUserInfo";
import PageBookingForm from "pages/book/PageBookingForm";
import PageMyshop from "pages/shop/PageMyShop";
import PageShopDetail from "pages/shop/PageShopDetail";
import PageShopBooking from "pages/shop/PageShopBooking";
import PageUserBooking from "pages/user/PageUserBooking";

function App() {
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
          <Route path="/booking/:shopId/" element={<PageBookingForm />} />
          <Route path="/shop/new/" element={<PageShopForm />} />
          <Route path="/shop/:shopId/" element={<PageShopDetail />} />
          <Route path="/shop/:shopId/edit/" element={<PageShopForm />} />
          <Route path="/shop/mystore/:shopId" element={<PageMyshop />} />
          <Route path="/shop/bookings/" element={<PageShopBooking />} />
          <Route path="/user/mypage/:userId/" element={<PageUserInfo />} />
          <Route path="/user/mypage/:userId/edit/" element={<PageUserJoin />} />
          <Route path="/user/bookings/" element={<PageUserBooking />} />
        </Routes>
      </div>
    </>
  );
}

export default App;

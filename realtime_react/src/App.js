import "./App.css";
import { Route, Routes } from "react-router-dom";
import TopNav from "components/Header/TopNav";
import PageLogin from "pages/accounts/PageLogin";
import PageUserJoin from "pages/accounts/PageUserJoin";
import PageShopJoin from "pages/accounts/PageShopJoin";
import PageIndex from "pages/PageIndex";

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
          <Route path="/account/shopjoin/" element={<PageShopJoin />} />
          <Route path="/account/userjoin/" element={<PageUserJoin />} />
          <Route path="/mypage/" element={<PageShopJoin />} />
        </Routes>
      </div>
    </>
  );
}

export default App;

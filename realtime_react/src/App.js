import "./App.css";
import { Route, Routes } from "react-router-dom";
import TopNav from "components/Header/TopNav";
import PageLogin from "pages/accounts/PageLogin";
import PageUserJoin from "pages/accounts/PageUserJoin";
import PageShopJoin from "pages/accounts/PageShopJoin";

function App() {
  return (
    <>
      <TopNav />
      <div className="App">
        <Routes>
          <Route path="/" element={<PageShopJoin />} />
          <Route path="/accounts/login/" element={<PageLogin />} />
          <Route path="/account/shopjoin/" element={<PageShopJoin />} />
          <Route path="/account/userjoin/" element={<PageUserJoin />} />
        </Routes>
      </div>
    </>
  );
}

export default App;

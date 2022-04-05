import Shopdashboard from "components/shop/Shopdashboard";
import ShopSidebar from "components/shop/ShopSidebar";
import React from "react";
import { useParams } from "react-router-dom";

function PageShopDashboard(props) {
  const { shopId } = useParams();
  return (
    <div className="grid grid-cols-6">
      <div className="bg-orange-400 mr-10">
        <ShopSidebar shopId={shopId} />
      </div>
      <div className="grid col-span-4 auto-rows-max">
        <Shopdashboard shopId={shopId} />
      </div>
    </div>
  );
}

export default PageShopDashboard;

import MyShop from "components/shop/MyShop";
import { useState } from "react";
import { useParams } from "react-router-dom";
import PageShopSidebar from "./PageShopSidebar";

function PageMyShop() {
  const { shopId } = useParams();
  const [xPosition, setX] = useState(0);

  return (
    <div
      className="grid grid-cols-8"
      style={{
        transform: `translatex(${xPosition}px)`,
      }}
    >
      <div className="grid col-span-2">
        <PageShopSidebar />
      </div>
      <div className="grid col-span-5 auto-rows-max">
        <MyShop shopId={shopId} />
      </div>
    </div>
  );
}

export default PageMyShop;

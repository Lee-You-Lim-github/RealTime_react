import ShopWaiting from "components/shop/ShopWaiting";
import React from "react";
import { useParams } from "react-router-dom";

function PageShopWaiting(props) {
  const { shopId } = useParams();
  return (
    <div>
      <ShopWaiting shopId={shopId} />
    </div>
  );
}

export default PageShopWaiting;
<ShopWaiting />;

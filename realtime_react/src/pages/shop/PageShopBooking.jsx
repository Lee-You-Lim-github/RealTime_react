import ShopBooking from "components/shop/ShopBooking";
import { useParams } from "react-router-dom";

function PageShopBooking() {
  const { shopId } = useParams();
  return (
    <div>
      <ShopBooking shopId={shopId} />
    </div>
  );
}

export default PageShopBooking;

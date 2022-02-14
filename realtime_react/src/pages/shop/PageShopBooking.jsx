import ShopBooking from "components/shop/ShopBooking";
import { useParams } from "react-router-dom";

function PageShopBooking() {
  useParams();
  return (
    <div>
      <ShopBooking />
    </div>
  );
}

export default PageShopBooking;

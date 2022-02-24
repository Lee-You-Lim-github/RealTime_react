import ShopBooking from "components/shop/ShopBooking";
import { useParams } from "react-router-dom";

function PageShopBooking() {
  const { shopId } = useParams();
  const { bookingId } = useParams();
  return (
    <div>
      <ShopBooking shopId={shopId} bookingId={bookingId} />
    </div>
  );
}

export default PageShopBooking;

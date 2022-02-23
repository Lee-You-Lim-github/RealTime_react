import ShopBooking from "components/shop/ShopBooking";
import { useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function PageShopBooking() {
  const { shopId } = useParams();
  const { bookingId } = useParams();
  return (
    <div>
      <ToastContainer containerId={"not_visit"} />
      <ToastContainer containerId={"visit"} />
      <ShopBooking shopId={shopId} bookingId={bookingId} />
    </div>
  );
}

export default PageShopBooking;

import BookingForm from "components/booking/BookingForm";
import DebugStates from "components/DebugStates";
import { useNavigate, useParams } from "react-router-dom";

function PageBookingForm() {
  const { shopId } = useParams();
  const { userId } = useParams();
  const navigate = useNavigate();

  return (
    <div>
      <BookingForm
        shopId={shopId}
        handleDidSave={(saveBooking) => {
          navigate(`/user/bookings/${saveBooking.user_id}}/`);
        }}
      />
    </div>
  );
}

export default PageBookingForm;

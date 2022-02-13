import BookingForm from "components/booking/BookingForm";
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
          navigate(`/user/bookings/${userId}`);
        }}
      />
    </div>
  );
}

export default PageBookingForm;

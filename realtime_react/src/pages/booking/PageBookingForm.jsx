import BookingForm from "components/booking/BookingForm";
import { useNavigate, useParams } from "react-router-dom";

function PageBookingForm() {
  const { shopId } = useParams();
  const navigate = useNavigate();

  return (
    <div>
      <BookingForm
        shopId={shopId}
        handleDidSave={(saveBooking) => {
          console.log(saveBooking.user_id);
          navigate(`/user/${saveBooking.user_id}/bookings/`);
        }}
      />
    </div>
  );
}

export default PageBookingForm;

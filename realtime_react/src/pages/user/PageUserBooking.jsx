import UserBooking from "components/user/UserBooking";
import { useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function PageUserBooking() {
  const { userId } = useParams();

  return (
    <div>
      <ToastContainer />
      <UserBooking userId={userId} />
    </div>
  );
}

export default PageUserBooking;

import UserBooking from "components/user/UserBooking";
import { useParams } from "react-router-dom";

function PageUserBooking() {
  const { userId } = useParams();

  return (
    <div>
      <UserBooking userId={userId} />
    </div>
  );
}

export default PageUserBooking;

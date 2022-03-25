import { useApiAxios } from "api/base";
import { useAuth } from "contexts/AuthContext";
import { useEffect } from "react";

function BookingInfo() {
  const [auth] = useAuth();

  const [{ data: bookings }, refetch] = useApiAxios(
    {
      url: `/booking/api/bookings/?all&user_id=${auth.id}&visit_status=0`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${auth.access}`,
      },
    },
    { manual: true }
  );

  useEffect(() => {
    refetch();
  }, []);

  //   let today = new Date.now();
  const today = new Date();
  const year = today.getFullYear();
  const month = ("0" + (today.getMonth() + 1)).slice(-2);
  const day = ("0" + today.getDate()).slice(-2);

  const hours = today.getHours();
  const minutes = today.getMinutes();
  const seconds = today.getSeconds();

  const dateString =
    year +
    "-" +
    month +
    "-" +
    day +
    " " +
    hours +
    " : " +
    minutes +
    " : " +
    seconds;

  return (
    <span>
      {bookings &&
        bookings.filter(
          (book_obj) => book_obj.day + " " + book_obj.time >= dateString
        ).length}
    </span>
  );
}

export default BookingInfo;

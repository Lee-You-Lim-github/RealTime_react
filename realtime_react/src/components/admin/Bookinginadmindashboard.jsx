import { useApiAxios } from "api/base";
import { useEffect } from "react";

function Bookinginadmindashboard() {
  const [{ data: booking, loading, error }, refetch] = useApiAxios(
    {
      url: `/booking/api/bookings/?all`,
      method: "GET",
    },
    { manual: true }
  );

  const [
    { data: waiting, loading: waitloading, error: waitingerror },
    getwaiting,
  ] = useApiAxios(
    {
      url: `/waiting/api/waitings/?all`,
      method: "GET",
    },
    { manual: true }
  );

  useEffect(() => {
    refetch();
    getwaiting();
  }, []);

  const today = new Date();
  const year = today.getFullYear();
  const month = ("0" + (today.getMonth() + 1)).slice(-2);
  const day = ("0" + today.getDate()).slice(-2);

  const dateString = year + "-" + month + "-" + day;

  const bookingcount = booking?.filter(
    (book) => book.day === dateString
  ).length;
  const waitingcount = waiting?.filter((wait) =>
    wait.wait_date.slice(0, 10)
  ).length;

  const allcounts = bookingcount + waitingcount;
  return (
    <div className="mt-16">
      <div> 오늘 접수된 예약은?</div>
      <div className="text-4xl">{allcounts}건</div>
    </div>
  );
}

export default Bookinginadmindashboard;

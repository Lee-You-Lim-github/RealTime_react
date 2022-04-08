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

  useEffect(() => {
    refetch();
  }, []);

  const today = new Date();
  const year = today.getFullYear();
  const month = ("0" + (today.getMonth() + 1)).slice(-2);
  const day = ("0" + today.getDate()).slice(-2);

  const dateString = year + "-" + month + "-" + day;

  return (
    <div className="mt-16 text-gray-800">
      <div> 오늘의 예약내역은?</div>
      <div className="text-4xl">
        {booking && booking?.filter((book) => book.day === dateString).length}건
      </div>
    </div>
  );
}

export default Bookinginadmindashboard;

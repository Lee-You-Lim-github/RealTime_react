import { useApiAxios } from "api/base";
import { useEffect } from "react";

function Bookinginshopdashboard({ shopId }) {
  const [{ data: booking, loading, error }, refetch] = useApiAxios(
    {
      url: `/booking/api/bookings/?shop_id=${shopId}`,
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
    <div>
      <div className="mt-10">오늘의 예약은?</div>
      <div className="text-2xl">
        <p>
          {booking &&
            booking?.results.filter((book) => book.day === dateString).length}
          건
        </p>
      </div>
    </div>
  );
}

export default Bookinginshopdashboard;

import { useApiAxios } from "api/base";
import DebugStates from "components/DebugStates";
import { useAuth } from "contexts/AuthContext";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function UserBooking() {
  const [auth] = useAuth();

  const [{ data: bookingList, loading, error }, refetch] = useApiAxios({
    url: "/booking/api/bookings/",
    method: "GET",
  });

  useEffect(() => {
    refetch();
  }, [auth]);

  return (
    <div>
      <h2 className="mb-3">예약현황</h2>
      {bookingList &&
        bookingList.map((booking) => (
          <div key={booking.id} className="mb-3">
            <Link
              to={`/shop/${booking.shop_id}/`}
              className="text-left text-2xl"
            >
              {booking.shop_id.name}
            </Link>
            <div className="flex flex-wrap">
              <div className="bg-violet-300 border border-violet-400 text-left w-1/5 rounded-sm p-3">
                <p>예약날짜</p>
                <p>예약시간</p>
                <p>예약 테이블 수</p>
              </div>
              <div className="bg-violet-200 border border-violet-400 text-left w-3/5 rounded-sm p-3">
                <p>{booking.day}</p>
                <p>{booking.time}</p>
                <p>{booking.book_table_count}</p>
                <button className="hover:text-violet-400">예약취소</button>
              </div>
            </div>
          </div>
        ))}

      <DebugStates data={bookingList} loading={loading} error={error} />
    </div>
  );
}

export default UserBooking;

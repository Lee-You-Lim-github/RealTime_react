import { useApiAxios } from "api/base";
import DebugStates from "components/DebugStates";
import { useAuth } from "contexts/AuthContext";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function UserBooking({ bookingId }) {
  const navigate = useNavigate();

  const [auth] = useAuth();

  const [bookingArray, setBookingArray] = useState([]);

  // userId === bookingList.user_id.id 예약만 보여주기

  const [{ data: bookingList, loading, error }, refetch] = useApiAxios(
    {
      url: "/booking/api/bookings/",
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

  useEffect(() => {
    const userBooking = bookingList?.filter(
      (booking) => parseInt(auth.id) === booking.user_id.id
    );

    setBookingArray(userBooking);
  }, [bookingList]);

  const [{ loading: deleteLoading, error: deleteError }, deleteBooking] =
    useApiAxios(
      {
        url: `/booking/api/bookings/${bookingList?.id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${auth.access}`,
        },
      },
      { manual: true }
    );

  const handleDelete = (e) => {
    e.preventDefault();
    const booking_id = e.target.value;
    if (window.confirm("Are you sure?")) {
      deleteBooking({
        url: `/booking/api/bookings/${booking_id}`,
        method: "DELETE",
      }).then(() => navigate(`/user/bookings/${auth.id}`));
    }
  };

  useEffect(() => {
    refetch();
  }, [bookingList]);

  return (
    <div>
      <h2 className="my-3 text-left">예약현황</h2>
      {bookingArray?.map((booking) => (
        <div key={booking.id} className="mb-3">
          <Link to={`/shop/${booking.shop_id.id}/`} className="text-2xl">
            <p className="text-left">{booking.shop_id.name}</p>
          </Link>
          <div className="flex flex-wrap">
            <div className="bg-violet-300 border border-violet-400 w-1/5 text-left rounded-sm p-3">
              <p>예약날짜</p>
              <p>예약시간</p>
              <p>예약 테이블 수</p>
            </div>
            <div className="border border-violet-400 w-3/5 rounded-sm p-3">
              <p className="text-left">{booking.day}</p>
              <p className="text-left">{booking.time}</p>
              <p className="text-left">{booking.book_table_count}</p>
              <button
                disabled={deleteLoading}
                onClick={handleDelete}
                value={booking.id}
                className="bg-violet-300 hover:bg-red-200 text-sm text-right rounded p-1"
              >
                예약취소
              </button>
            </div>
          </div>
        </div>
      ))}
      {!bookingArray && "예약 내역이 없습니다."}

      <DebugStates
        bookingList={bookingList}
        bookingArray={bookingArray}
        loading={loading}
        error={error}
      />
    </div>
  );
}

export default UserBooking;

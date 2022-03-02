import { useApiAxios } from "api/base";
import { useAuth } from "contexts/AuthContext";
import React, { useEffect, useState } from "react";
import LoadingIndicator from "components/LoadingIndicator";
import DebugStates from "components/DebugStates";
import UserBookingComponent from "./UserBookingComponent";

function UserBooking() {
  const [auth] = useAuth();

  const [bookingArray, setBookingArray] = useState([]);

  // userId === bookingList.user_id.id 예약만 보여주기
  const [
    { data: bookingList, loading: bookingLoading, error: bookingError },
    refetch,
  ] = useApiAxios(
    {
      url: "/booking/api/bookings/?all&ordering=-day",
      method: "GET",
      headers: {
        Authorization: `Bearer ${auth.access}`,
      },
    },
    { manual: true }
  );

  useEffect(() => {
    const userBooking = bookingList?.filter(
      (booking) => parseInt(auth.id) === booking.user_id.id
    );

    if (userBooking !== undefined) {
      setBookingArray(userBooking);
    }
  }, [bookingList, auth.id]);

  useEffect(() => {
    refetch().then((response) => console.log(response.data));
  }, []);

  return (
    <div className="layout">
      <h2 className="my-5 text-left text-2xl">예약현황</h2>
      {bookingLoading && <LoadingIndicator>로딩 중...</LoadingIndicator>}

      {bookingArray.length > 0 ? (
        <>
          {bookingArray?.map((booking_object) => (
            <UserBookingComponent
              key={booking_object.id}
              booking_object={booking_object}
              bookingList={bookingList}
            />
          ))}
        </>
      ) : (
        "예약 내역이 없습니다."
      )}
    </div>
  );
}

export default UserBooking;

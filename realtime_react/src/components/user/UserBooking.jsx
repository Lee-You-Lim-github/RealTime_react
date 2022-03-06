import { useApiAxios } from "api/base";
import { useAuth } from "contexts/AuthContext";
import React, { useEffect, useState } from "react";
import LoadingIndicator from "components/LoadingIndicator";
import DebugStates from "components/DebugStates";
import UserBookingComponent from "./UserBookingComponent";
import user_booking from "assets/img/shop_booking.png";

function UserBooking() {
  const [auth] = useAuth();

  const [bookingArray, setBookingArray] = useState([]);

  // userId === bookingList.user_id.id 예약만 보여주기
  const [
    { data: bookingList, loading: bookingLoading, error: bookingError },
    refetch,
  ] = useApiAxios(
    {
      url: "/booking/api/bookings/?all&ordering=day",
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
    refetch().then();
  }, []);

  return (
    <div className="w-[900px] mx-auto mt-14 mb-20">
      <div className="flex flex-row mt-14 mb-5">
        <img src={user_booking} alt="" className="w-8 h-8 ml-2" />
        <h2 className="text-left text-2xl ml-2">예약현황</h2>
      </div>

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

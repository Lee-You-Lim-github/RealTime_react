import { useApiAxios } from "api/base";
import { useAuth } from "contexts/AuthContext";
import React, { useEffect, useState } from "react";
import LoadingIndicator from "components/LoadingIndicator";
import ShowMore from "react-show-more-list";
import UserBookingComponent from "./UserBookingComponent";
import booklist from "assets/img/booklist.png";

function UserBooking() {
  const [auth] = useAuth();

  const [bookingArray, setBookingArray] = useState([]);

  // userId === bookingList.user_id.id 예약만 보여주기
  const [
    { data: bookingList, loading: bookingLoading, error: bookingError },
    refetch,
  ] = useApiAxios(
    {
      url: "/booking/api/bookings/?ordering=-day&all",
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

  const scrollUp = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="w-full mx-auto mb-20">
      <div className="flex flex-row my-10">
        <img src={booklist} alt="booklist" className="w-10 h-10 ml-7" />
        <h2 className="text-left text-2xl ml-2 mt-1">예약내역</h2>
      </div>

      {bookingLoading && <LoadingIndicator>로딩 중...</LoadingIndicator>}

      <ShowMore items={bookingArray} by={3}>
        {({ current, onMore }) => (
          <>
            {bookingArray.length > 0 ? (
              <div className="grid grid-cols-3">
                {current?.map((booking_object) => (
                  <UserBookingComponent
                    key={booking_object.id}
                    booking_object={booking_object}
                    bookingList={bookingList}
                  />
                ))}
              </div>
            ) : (
              "예약 내역이 없습니다."
            )}

            <div>
              {onMore ? (
                <button
                  disabled={!onMore}
                  onClick={() => {
                    if (!!onMore) onMore();
                  }}
                  className="text-lg border-2 border-stone-300 px-1 my-5"
                >
                  SHOW MORE
                </button>
              ) : (
                <button
                  onClick={scrollUp}
                  className="text-lg border-2 border-stone-300 px-1 my-5"
                >
                  TOP
                </button>
              )}
            </div>
          </>
        )}
      </ShowMore>
    </div>
  );
}

export default UserBooking;

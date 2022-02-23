import { useApiAxios } from "api/base";
import DebugStates from "components/DebugStates";
import { useAuth } from "contexts/AuthContext";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingIndicator from "components/LoadingIndicator";
import DeleteConfirmModal from "components/modal/DeleteConfirmModal";

function UserBooking() {
  const [auth] = useAuth();

  const [bookingArray, setBookingArray] = useState([]);

  // confirm 모달창
  const [modalOpen, setModalOpen] = useState(false);

  const [bookingDeleteId, setBookingDeleteId] = useState();

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
    const userBooking = bookingList?.results?.filter(
      (booking) => parseInt(auth.id) === booking.user_id.id
    );

    if (userBooking !== undefined) {
      setBookingArray(userBooking);
    }
  }, [bookingList, auth.id]);

  const [{ loading: deleteLoading, error: deleteError }, deleteBooking] =
    useApiAxios(
      {
        url: `/booking/api/bookings/${bookingList?.id}/`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${auth.access}`,
        },
      },
      { manual: true }
    );

  const handleDelete = (e) => {
    deleteBooking({
      url: `/booking/api/bookings/${bookingDeleteId}/`,
      method: "DELETE",
    });
    toast.info("🦄 취소되었습니다.", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    window.location.replace(`/user/bookings/${auth.id}/`);
  };

  useEffect(() => {
    refetch();
  }, []);

  // confirm 모달 열기
  const openModal = (e) => {
    setModalOpen(true);
    setBookingDeleteId(e.target.value);
  };

  // confirm 모달 닫기
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <h2 className="my-3 text-left">예약현황</h2>
      {loading && <LoadingIndicator>로딩 중...</LoadingIndicator>}
      {deleteLoading && <LoadingIndicator>취소 중...</LoadingIndicator>}
      {deleteError?.response?.status >= 400 && (
        <div className="text-red-400">삭제에 실패했습니다.</div>
      )}

      {bookingArray.length > 0 ? (
        <>
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
                  <React.Fragment>
                    <button
                      disabled={deleteLoading}
                      onClick={openModal}
                      value={booking.id}
                      className="bg-violet-300 hover:bg-red-200 text-sm text-right rounded p-1"
                    >
                      예약취소
                    </button>
                    <DeleteConfirmModal
                      handleDelete={handleDelete}
                      open={modalOpen}
                      close={closeModal}
                      name="user_booking_delete"
                      header="1시간 전 예약 취소 시 노쇼(No Show)방지 차원으로 서비스 이용이 제한될 수 있습니다."
                    />
                  </React.Fragment>
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        "예약 내역이 없습니다."
      )}
    </div>
  );
}

export default UserBooking;

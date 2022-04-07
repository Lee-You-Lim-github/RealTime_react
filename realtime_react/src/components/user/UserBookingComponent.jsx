import { useApiAxios } from "api/base";
import LoadingIndicator from "components/LoadingIndicator";
import DeleteConfirmModal from "components/modal/DeleteConfirmModal";
import { useAuth } from "contexts/AuthContext";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import noimages from "assets/img/noimages.png";
import noshow_warning from "assets/img/noshow_warning.png";

function UserBookingComponent({ bookingList, booking_object }) {
  const [auth] = useAuth();

  // 현재 테이블 수 값 변경
  const [tableCount, setTableCount] = useState();

  // 예약 취소
  const [bookingDeleteId, setBookingDeleteId] = useState();

  // confirm 모달창
  const [modalOpen, setModalOpen] = useState(false);

  // 매장 현재 테이블 수 변경
  const [
    { loading: shopPatchLoading, error: shopPatchError },
    shopPatchrefetch,
  ] = useApiAxios(
    {
      url: `/shop/api/shops/${booking_object.shop_id.id}/`,
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${auth.access}`,
      },
    },
    { manual: true }
  );

  useEffect(() => {
    setTableCount(booking_object.now_table_count);
  }, [booking_object]);

  // 예약취소
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

  const handleDelete = () => {
    if (booking_object.method === "1") {
      setTableCount(
        booking_object.shop_id.now_table_count - booking_object.book_table_count
      );
    }

    deleteBooking({
      url: `/booking/api/bookings/${bookingDeleteId}/`,
      method: "DELETE",
    });

    alert("예약이 취소되었습니다.");
    window.location.replace(`/user/${auth.id}/bookings/`);
  };

  useEffect(() => {
    shopPatchrefetch({ data: { now_table_count: tableCount } })
      .then((response) => {
        setTableCount(response.data.now_table_count);
      })
      .catch();
  }, [tableCount]);

  // confirm 모달 열기
  const openModal = (e) => {
    setModalOpen(true);
    setBookingDeleteId(e.target.value);
  };

  // confirm 모달 닫기
  const closeModal = () => {
    setModalOpen(false);
  };

  // 화면을 눌렀을 때 닫기 가능
  const el = useRef();

  const handleClose = (e) => {
    if (modalOpen && (!el.current || !el.current.contains(e.target)))
      setModalOpen(false);
  };

  useEffect(() => {
    window.addEventListener("click", handleClose);
    return () => {
      window.removeEventListener("click", handleClose);
    };
  }, []);

  // 오늘 날짜
  let today = new Date();

  // 0: 방문예정 1:방문완료
  const visit_state = (visit) => {
    if (visit === "1") {
      return <div>방문완료 ✅</div>;
    } else if (
      visit === "2" ||
      new Date(`${booking_object.day} ${booking_object.time}`) - today < 0
    ) {
      return <div className="text-red-600">미방문 😢</div>;
    } else {
      return <div>방문예정 🚀</div>;
    }
  };

  return (
    <div>
      {deleteLoading && <LoadingIndicator>취소 중...</LoadingIndicator>}
      {deleteError?.response?.status >= 400 && (
        <div className="text-red-400">취소에 실패했습니다.</div>
      )}

      <div className="w-72 mb-7 border border-stone-300 rounded overflow-hidden hover:-translate-y-1">
        {!booking_object?.shop_id.photo1 ? (
          <img className="w-full h-56" src={noimages} alt="no_images" />
        ) : (
          <img
            className="w-full h-56"
            src={booking_object.shop_id.photo1}
            alt={booking_object.shop_id.name}
          />
        )}

        <div className="my-4 mx-2">
          <Link to={`/shop/${booking_object.shop_id.id}/`} className="text-2xl">
            <p>{booking_object.shop_id.name}</p>
          </Link>
        </div>

        <div className="grid grid-cols-2">
          <div className="text-left ml-8">
            <p>예약날짜</p>
            <p>예약시간</p>
            <p>예약 테이블 수</p>
            <p className="mt-4 mb-3">
              {visit_state(booking_object.visit_status)}
            </p>
          </div>

          <div className="ml-8">
            <p className="text-left">{booking_object.day}</p>
            <p className="text-left">{booking_object.time}</p>
            <p className="text-left">{booking_object.book_table_count}</p>
            <p className="my-3">
              <React.Fragment>
                {booking_object.visit_status !== "1" &&
                  new Date(`${booking_object.day} ${booking_object.time}`) -
                    today >
                    0 && (
                    <button
                      disabled={deleteLoading}
                      onClick={openModal}
                      value={booking_object.id}
                      className="border-2 border-orange-400 text-orange-400 text-sm rounded p-1"
                    >
                      예약취소
                    </button>
                  )}

                {booking_object.visit_status === "1" &&
                  booking_object.review_set.length === 0 && (
                    <div className="">
                      <Link
                        to={`/user/${auth.id}/book/${booking_object.id}/review/new/`}
                        className="border-1 border-orange-400 bg-orange-400 text-white text-sm rounded px-1 py-2"
                        state={booking_object.user_id.id}
                      >
                        리뷰작성
                      </Link>
                    </div>
                  )}

                <DeleteConfirmModal
                  handleDelete={handleDelete}
                  open={modalOpen}
                  close={closeModal}
                  name="user_booking_delete"
                  header="예약을 취소 하시겠습니까?"
                  ref={el}
                >
                  <div>
                    <div className="flex flex-col justify-center text-xs text-red-600 -mt-3">
                      <div className="flex justify-center">
                        <img src={noshow_warning} alt="" className="w-8 h-8" />
                      </div>
                      <div className="mt-1">
                        1시간 전 예약 취소 시 노쇼(No Show)방지 차원으로 서비스
                        이용이 제한될 수 있습니다.
                      </div>
                    </div>
                  </div>
                </DeleteConfirmModal>
              </React.Fragment>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserBookingComponent;

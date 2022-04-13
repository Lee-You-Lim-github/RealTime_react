import { useApiAxios } from "api/base";
import { useAuth } from "contexts/AuthContext";
import useFieldValues from "hook/usefieldValues";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import LoadingIndicator from "components/LoadingIndicator";
import "react-toastify/dist/ReactToastify.css";
import BookingConfirmModal from "components/modal/BookingConfirmModal";

const INIT_FIELD_VALUES = {
  day: "",
  time: "",
  book_table_count: "0",
  visit_status: "0",
  method: "0",
};

function BookingForm({ shopId, handleDidSave }) {
  const navigate = useNavigate();
  const [auth] = useAuth();

  const { fieldValues, handleFieldChange } = useFieldValues(INIT_FIELD_VALUES);

  // confirm 모달창
  const [modalOpen, setModalOpen] = useState(false);

  const [{ loading, error, errorMessages }, requestBooking] = useApiAxios(
    {
      url: "/booking/api/bookings/",
      method: "POST",
      headers: {
        Authorization: `Bearer ${auth.access}`,
      },
    },
    { manual: true }
  );

  const handleSubmit = () => {
    if (fieldValues.book_table_count !== "0") {
      requestBooking({
        data: { ...fieldValues, user_id: auth.id, shop_id: shopId },
      }).then((response) => {
        alert("예약되었습니다.");
        const saveBooking = response.data;
        if (handleDidSave) handleDidSave(saveBooking);
      });
    } else {
      alert("테이블 수를 확인해주세요.");
    }
  };
  // confirm 모달 열기
  const openModal = () => {
    setModalOpen(true);
  };

  // confirm 모달 닫기
  const closeModal = () => {
    setModalOpen(false);
  };

  let today = new Date();

  const alertDate = () => {
    alert("날짜를 확인해주세요");
  };

  return (
    <div className="h-[650px] flex justify-center items-center w-full my-32">
      <div className="px-10 py-8 rounded-xl w-screen shadow-md max-w-sm border border-orange-400">
        <div className="space-y-4">
          <h2 className="text-center text-2xl font-semibold text-gray-800">
            지금말고 예약
          </h2>
          {loading && <LoadingIndicator>예약 중...</LoadingIndicator>}
          {error?.response?.status >= 400 && (
            <div className="text-red-400 my-5">예약에 실패했습니다.</div>
          )}
          <div className="text-gray-800 text-left font-semibold block my-3 ml-1 text-md">
            예약 날짜
          </div>
          <div>
            <input
              type="date"
              name="day"
              value={fieldValues.day}
              onChange={handleFieldChange}
              className="laceholder:italic placeholder:text-md placeholder:text-stone-300 w-full bg-stone-100 px- py-2 rounded-lg focus:outline-none text-center"
            />
          </div>
          <div className="text-gray-800 text-left font-semibold block my-3 ml-1 text-md">
            예약 시간
          </div>
          <div>
            <input
              type="time"
              name="time"
              step="3600"
              value={fieldValues.time}
              onChange={handleFieldChange}
              className="laceholder:italic placeholder:text-md placeholder:text-stone-300 w-full bg-stone-100 px-4 py-2 rounded-lg focus:outline-none text-center"
            />
          </div>
          <div className="text-gray-800 text-left font-semibold block my-3 ml-1 text-md">
            테이블 수(4인 테이블 기준)
          </div>
          <div>
            <input
              type="number"
              name="book_table_count"
              value={fieldValues.book_table_count}
              onChange={handleFieldChange}
              placeholder="1"
              min="1"
              className="laceholder:italic placeholder:text-md placeholder:text-stone-300 w-full bg-stone-100 px-4 py-2 rounded-lg focus:outline-none text-center"
            />
          </div>
          <div className="bg-stone-100 p-2">
            <p className="text-left text-red-500 mb-1">📢 주의해주세요</p>
            <p className="text-left">
              (주)지금어때는 건강한 예약문화를 만들어가기 위하여 노쇼 시 횟수에
              따라 패널티(계정정지)를 부여합니다.
            </p>
            <p className="text-left">
              <p>▪ 1회 : 3일</p>
              <p>▪ 2회 : 7일</p>
              <p>▪ 3회 : 1달</p>
              <p>▪ 4회 : 영구정지</p>
            </p>{" "}
            <p className="text-left">참고하여 예약바랍니다.</p>
          </div>

          <React.Fragment>
            <div className="btnBox flex-auto mt-10 mb-20">
              <button
                className="mt-4 w-full border-2 border-orange-400 bg-orange-400 text-white py-2 rounded-md text-lg tracking-wide"
                onClick={openModal}
              >
                예약
              </button>

              <BookingConfirmModal
                handleSubmit={handleSubmit}
                open={modalOpen}
                close={closeModal}
                name="not_now_booking"
                header="1시간 전 예약 취소 시 노쇼(No Show)방지 차원으로 서비스 이용이 제한될 수 있습니다."
              ></BookingConfirmModal>
              <button
                className="mt-4 w-full bg-white text-orange-400 border-2 border-orange-400 py-2 rounded-md text-lg tracking-wide"
                onClick={() => navigate(`/shop/${shopId}/`)}
              >
                취소
              </button>
            </div>
          </React.Fragment>
        </div>
      </div>
    </div>
  );
}

export default BookingForm;

import { useApiAxios } from "api/base";
import { useAuth } from "contexts/AuthContext";
import useFieldValues from "hook/usefieldValues";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import LoadingIndicator from "components/LoadingIndicator";
import "react-toastify/dist/ReactToastify.css";
import BookingConfirmModal from "components/modal/BookingConfirmModal";
import "./BookingForm.css";

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
      url: "/booking/api/newbooking/",
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
        console.log(saveBooking);
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

  return (
    <div className="layout border-2 border-slate-300 rounded shadow-xl">
      <div className="mx-auto headingBox mt-2 mb-6">
        <h2 className="mb-10 headings">지금말고 예약</h2>
        {loading && <LoadingIndicator>예약 중...</LoadingIndicator>}
        {error?.response?.status >= 400 && (
          <div className="text-red-400 my-5">예약에 실패했습니다.</div>
        )}

        <div className="subName mb-5">예약 날짜</div>
        <div>
          <input
            type="date"
            name="day"
            value={fieldValues.day}
            onChange={handleFieldChange}
            className="inputBox border-2 rounded border-violet-400 mb-10"
          />
        </div>

        <div className="subName mb-5">예약 시간</div>
        <div>
          <input
            type="time"
            name="time"
            step="3600"
            value={fieldValues.time}
            onChange={handleFieldChange}
            className="inputBox border-2 rounded border-violet-400 mb-10"
          />
        </div>

        <div className="subName mb-5">테이블 수(4인 테이블 기준)</div>
        <div>
          <input
            type="number"
            name="book_table_count"
            value={fieldValues.book_table_count}
            onChange={handleFieldChange}
            placeholder="1"
            min="1"
            className="inputBox border-2 border-violet-400  placeholder:text-slate-300 rounded my-1 p-2 text-center w-1/2 mb-10"
          />
        </div>

        <React.Fragment>
          <div className="btnBox flex-auto mt-10 mb-20">
            <button
              className="bg-violet-400 hover:bg-red-300 text-white w-1/2 rounded m-1 mx-2 p-2 focus:outline-none focus:shadow-outline"
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
              className="border-violet-400 border-2 hover:border-red-300 hover:text-red-300 text-violet-400 w-1/2 rounded m-1 mx-2 p-2 focus:outline-none focus:shadow-outline"
              onClick={() => navigate(`/shop/${shopId}/`)}
            >
              취소
            </button>
          </div>
        </React.Fragment>
      </div>
    </div>
  );
}

export default BookingForm;

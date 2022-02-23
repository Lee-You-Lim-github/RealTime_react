import { useApiAxios } from "api/base";
import DebugStates from "components/DebugStates";
import { useAuth } from "contexts/AuthContext";
import useFieldValues from "hook/usefieldValues";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import LoadingIndicator from "components/LoadingIndicator";
import { toast } from "react-toastify";
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
      url: "/booking/api/newbooking/",
      method: "POST",
      headers: {
        Authorization: `Bearer ${auth.access}`,
      },
    },
    { manual: true }
  );

  const handleSubmit = () => {
    requestBooking({
      data: { ...fieldValues, user_id: auth.id, shop_id: shopId },
    }).then((response) => {
      console.log("저장 성공");
      toast.info("🦄 예약되었습니다.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      const saveBooking = response.data;
      console.log(saveBooking);
      if (handleDidSave) handleDidSave(saveBooking);
    });
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
    <div>
      <h2>지금말고 예약</h2>
      {loading && <LoadingIndicator>예약 중...</LoadingIndicator>}
      {error?.response?.status >= 400 && (
        <div className="text-red-400 my-5">예약에 실패했습니다.</div>
      )}

      <p className="text-left ml-56 mt-2">예약 날짜</p>
      <div>
        <input
          type="date"
          name="day"
          value={fieldValues.day}
          onChange={handleFieldChange}
        />
      </div>

      <p className="text-left ml-56 mt-2">예약 시간</p>
      <div>
        <input
          type="time"
          name="time"
          step="3600"
          value={fieldValues.time}
          onChange={handleFieldChange}
        />
      </div>

      <p className="text-left ml-56 mt-2">테이블 수</p>
      <div>4인 테이블 기준</div>
      <input
        type="number"
        name="book_table_count"
        value={fieldValues.book_table_count}
        onChange={handleFieldChange}
        placeholder="0"
        min="0"
        className="placeholder:italic placeholder:text-slate-300 border border-gray-300 rounded w-1/2 my-1 mx-2 p-2"
      />
      <React.Fragment>
        <div>
          <button
            className="bg-violet-300 w-1/2 rounded my-1 mx-2 p-2"
            onClick={openModal}
          >
            예약
          </button>
        </div>
        <BookingConfirmModal
          handleSubmit={handleSubmit}
          open={modalOpen}
          close={closeModal}
          name="not_now_booking"
          header="1시간 전 예약 취소 시 노쇼(No Show)방지 차원으로 서비스 이용이 제한될 수 있습니다."
        ></BookingConfirmModal>
      </React.Fragment>
      <div>
        <button
          className="bg-slate-300 w-1/2 rounded my-1 mx-2 mb-5 p-2"
          onClick={() => navigate(`/shop/${shopId}/`)}
        >
          취소
        </button>
      </div>
    </div>
  );
}

export default BookingForm;

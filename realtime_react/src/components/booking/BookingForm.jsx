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
    <div className="layout md:mx-auto lg:mx-auto">
      <div className="sm:flex-1 text-xl lg:text-lg mx-auto w-full mt-10 lg:py-6 mb-6 lg:mb-0">
        <h2 className="mb-10 headings">지금말고 예약</h2>
        {loading && <LoadingIndicator>예약 중...</LoadingIndicator>}
        {error?.response?.status >= 400 && (
          <div className="text-red-400 my-5">예약에 실패했습니다.</div>
        )}

        <div className="subName lg:flex-1 ml-16 mb-5 w-3/5 xl:ml-40">
          예약 날짜
        </div>
        <div>
          <input
            type="date"
            name="day"
            value={fieldValues.day}
            onChange={handleFieldChange}
            className="mb-10"
          />
        </div>

        <div className="subName lg:flex-1 ml-16 mb-5 w-3/5 xl:ml-40">
          예약 시간
        </div>
        <div>
          <input
            type="time"
            name="time"
            step="3600"
            value={fieldValues.time}
            onChange={handleFieldChange}
            className="mb-10"
          />
        </div>

        <div className="subName lg:flex-1 ml-32 mb-5 w-3/5 xl:ml-56">
          테이블 수(4인 테이블 기준)
        </div>
        <div className="lg:flex-1 mx-auto w-3/5 xl:w-1/2">
          <input
            type="number"
            name="book_table_count"
            value={fieldValues.book_table_count}
            onChange={handleFieldChange}
            placeholder="0"
            min="0"
            className="placeholder:text-slate-300 border border-pink-300 rounded my-1 mx-2 p-2 text-center w-1/2 mb-10"
          />
        </div>

        <React.Fragment>
          <div className="btnBox lg:flex-1 mx-auto w-3/5 xl:w-1/2">
            <button
              className="bg-violet-300 w-1/2 rounded my-1 mx-2 p-2"
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
              className="bg-slate-300 w-1/2 rounded my-1 mx-2 mx-2 p-2"
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

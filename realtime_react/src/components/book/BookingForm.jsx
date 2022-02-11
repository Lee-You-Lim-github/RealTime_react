import { useApiAxios } from "api/base";
import DebugStates from "components/DebugStates";
import { useAuth } from "contexts/AuthContext";
import useFieldValues from "hook/usefieldValues";
import { useNavigate, useParams } from "react-router-dom";

const INIT_FIELD_VALUES = {
  day: "",
  time: "",
  book_table_count: "0",
  visit_status: "0",
  method: "0",
};

function BookingForm() {
  const navigate = useNavigate();
  const [auth] = useAuth();
  const { shopId } = useParams();

  const { fieldValues, handleFieldChange } = useFieldValues(INIT_FIELD_VALUES);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("저장 성공");

    requestBooking({
      data: { ...fieldValues, user_id: auth.id, shop_id: shopId },
    }).then((response) => {
      const {} = response.data;
      navigate("/mybooking/");
    });
  };

  return (
    <div>
      <h2>BookingForm</h2>
      <DebugStates
        fieldValues={fieldValues}
        error={error}
        errorMessages={errorMessages}
      />
      <form onSubmit={handleSubmit}>
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

        <div>
          <button className="bg-violet-300 w-1/2 rounded my-1 mx-2 p-2">
            예약
          </button>
        </div>

        <div>
          <button className="bg-slate-300 w-1/2 rounded my-1 mx-2 mb-5 p-2">
            취소
          </button>
        </div>
      </form>
    </div>
  );
}

export default BookingForm;

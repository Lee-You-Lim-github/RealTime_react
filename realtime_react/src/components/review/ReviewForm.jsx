import { useApiAxios } from "api/base";
import DebugStates from "components/DebugStates";
import LoadingIndicator from "components/LoadingIndicator";
import { useAuth } from "contexts/AuthContext";
import useFieldValues from "hook/usefieldValues";
import { useLocation, useNavigate } from "react-router-dom";
import Reviewradio from "./Reviewradio";
import StarRatingComponent from "react-star-rating-component";
import { useEffect, useState } from "react";

const INIT_FIELD_VALUES = {
  flavor: "",
  cleaned: "",
  kindness: "",
  mood: "",
  rating: "",
  content: "",
  book_id: "",
  wait_id: "",
};

function ReviewForm({ type, Id }) {
  const navigate = useNavigate();
  const [auth] = useAuth();
  const [value, setValue] = useState(5);
  let location = useLocation();
  let state = location.state;

  const names = {
    flavor: "맛은",
    cleaned: "청결은",
    kindness: "친절은",
    mood: "분위기는",
  };
  const { fieldValues, handleFieldChange, setFieldValues } =
    useFieldValues(INIT_FIELD_VALUES);
  const [{ loading, error, errorMessages }, requestreview] = useApiAxios(
    {
      url: "/review/api/review/",
      method: "POST",
    },
    { manual: true }
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    requestreview({ data: { ...fieldValues, [type + "_id"]: Id } }).then(
      (response) => {
        const {
          flavor,
          cleaned,
          kindness,
          mood,
          rating,
          content,
          book_id,
          wait_id,
        } = response.data;
        navigate(`/user/${auth.id}/review/`);
      }
    );
  };
  const onStarClick = (nextValue, prevValue, name) => {
    setValue(nextValue);
  };

  useEffect(() => {
    setFieldValues((prev) => {
      return { ...prev, rating: value };
    });
  }, [value]);

  return (
    <div>
      {loading && <LoadingIndicator>저장 중...</LoadingIndicator>}
      {error?.response?.status >= 400 && (
        <div className="text-red-400 my-5">저장에 실패했습니다.</div>
      )}
      {auth.id === state && (
        <form onSubmit={handleSubmit}>
          <h1>리뷰쓰기</h1>
          {Object.keys(names).map((name) => (
            <div>
              <span>{names[name]} 어떠한가요?</span>
              <Reviewradio
                name={name}
                fieldValues={fieldValues}
                handleFieldChange={handleFieldChange}
              />
            </div>
          ))}

          <div>
            <span>별점을 주세요!</span>
            <div className="text-6xl">
              <StarRatingComponent
                name="rating"
                starCount={5}
                value={value}
                onStarClick={onStarClick}
                emptyStarColor="#ddd9cc"
              />
            </div>
          </div>
          <textarea
            name="content"
            value={fieldValues.content}
            onChange={handleFieldChange}
            placeholder="내용을 입력해주세요."
          />
          <button onClick={() => navigate(`/user/${auth.id}/bookings/`)}>
            취소
          </button>
          <button>저장</button>
        </form>
      )}
      <DebugStates fieldValues={fieldValues} />;
    </div>
  );
}

export default ReviewForm;

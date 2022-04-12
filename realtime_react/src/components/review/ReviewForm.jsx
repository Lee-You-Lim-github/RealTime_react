import { useApiAxios } from "api/base";
import DebugStates from "components/DebugStates";
import LoadingIndicator from "components/LoadingIndicator";
import { useAuth } from "contexts/AuthContext";
import useFieldValues from "hook/usefieldValues";
import { useLocation, useNavigate } from "react-router-dom";
import Reviewradio from "./Reviewradio";
import StarRatingComponent from "react-star-rating-component";
import { useEffect, useState } from "react";
import review from "assets/img/revieworange.png";

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
    if (window.confirm("리뷰를 저장하시겠습니까?")) {
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
          alert("리뷰를 저장하였습니다.");
          navigate(`/user/${auth.id}/review/`);
        }
      );
    }
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
          <div className="flex my-10">
            <img src={review} alt="review" className="h-11 w-11" />
            <span className="text-2xl mt-2 ml-3 mb-10">리뷰쓰기</span>
          </div>
          {Object.keys(names).map((name) => (
            <div>
              <span className="text-lg relative right-[20rem] border-b-4 border-orange-400">
                {names[name]} 어떠한가요?
              </span>
              <Reviewradio
                name={name}
                fieldValues={fieldValues}
                handleFieldChange={handleFieldChange}
              />
            </div>
          ))}

          <div>
            <div className="text-lg pr-10 border-b-4 border-orange-400 w-36 relative left-[7rem]">
              별점을 주세요!
            </div>

            <div className="text-7xl mr-80 mt-6">
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
            placeholder="  미방 및 욕설은 관리자에 의해 삭제될 수 있습니다."
            className="w-[815px] h-48 outline-none border-2 border-stone-400 ml-15 mt-10"
          />
          <div className="mb-10 mt-3">
            <button
              className="w-24 h-8 border border-stone-400 text-stone-400 rounded-lg mr-3"
              onClick={() => navigate(`/user/${auth.id}/bookings/`)}
            >
              취소
            </button>
            <button className="w-24 h-8 bg-orange-400 text-white rounded-lg">
              저장
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default ReviewForm;

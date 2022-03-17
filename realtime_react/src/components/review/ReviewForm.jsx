import { useApiAxios } from "api/base";
import { useAuth } from "contexts/AuthContext";
import useFieldValues from "hook/usefieldValues";
import { useNavigate } from "react-router-dom";
import Reviewradio from "./Reviewradio";

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
  const names = {
    flavor: "맛은",
    cleaned: "청결은",
    kindness: "친절은",
    mood: "분위기는",
  };
  const { fieldValues, handleFieldChange } = useFieldValues(INIT_FIELD_VALUES);
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
      }
    );
  };

  return (
    <div>
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
          <select
            name="rating"
            value={fieldValues.rating}
            onChange={handleFieldChange}
          >
            <option value="selected">---</option>
            <option value="5">5</option>
            <option value="5">4</option>
            <option value="5">3</option>
            <option value="5">2</option>
            <option value="5">1</option>
          </select>
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
        <button onClick={() => navigate(`/user/${auth.id}/review/`)}>
          저장
        </button>
      </form>
    </div>
  );
}

export default ReviewForm;

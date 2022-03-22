import { useApiAxios } from "api/base";
import { useAuth } from "contexts/AuthContext";
import useFieldValues from "hook/usefieldValues";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const INIT_FIELD_VALUES = {
  title: "",
  content: "",
  answer: "",
  photo: "",
  user_id: "",
};

function QnaForm({ userId, handleDidSave }) {
  const [auth] = useAuth();
  const { fieldValues, handleFieldChange } = useFieldValues(INIT_FIELD_VALUES);

  const [
    {
      loading: saveLoading,
      error: saveError,
      errorMessages: saveErrorMessages,
    },
    saveRequest,
  ] = useApiAxios(
    {
      url: "/qna/api/qna/",
      method: "POST",
    },
    { manual: true }
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(fieldValues).forEach(([name, value]) => {
      if (Array.isArray(value)) {
        const fileList = value;
        fileList.forEach((file) => formData.append(name, file));
      } else {
        formData.append(name, value);
      }
    });
    formData.append("user_id", auth.id);

    console.log(formData);

    saveRequest({
      data: formData,
    }).then((response) => {
      const savedQna = response.data;
      console.log(response.data);
      if (handleDidSave) handleDidSave(savedQna);
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <input
              type="text"
              name="title"
              value={fieldValues.title}
              onChange={handleFieldChange}
            />
          </div>

          <div>
            <textarea
              type="textarea"
              name="content"
              value={fieldValues.content}
              onChange={handleFieldChange}
            />

            <div>
              <input
                type="file"
                name="photo"
                onChange={handleFieldChange}
                accept=".jpg, .png, .jpeg"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button className="mr-3 w-12 h-8 bg-orange-400 text-white rounded-lg">
              저장
            </button>

            <Link
              type="button"
              className="w-12 h-8 text-stone-400 border border-stone-400 rounded-lg"
              to={`/user/${userId}/qna/`}
            >
              <div className="mt-1">취소</div>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default QnaForm;

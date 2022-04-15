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

    saveRequest({
      data: formData,
    }).then((response) => {
      const savedQna = response.data;
      if (handleDidSave) handleDidSave(savedQna);
    });
  };

  return (
    <div className="mt-10">
      <form onSubmit={handleSubmit}>
        <div>
          <div className="flex">
            <span className="bg-orange-400 text-white w-10 h-8 rounded rounded-lg pt-1 flex justify-center">
              제목
            </span>
            <input
              type="text"
              name="title"
              value={fieldValues.title}
              onChange={handleFieldChange}
              placeholder="제목을 입력해주세요."
              className="border-b-2 border-stone-400 ml-2 w-full outline-none"
            />
          </div>

          <div>
            <textarea
              type="textarea"
              name="content"
              value={fieldValues.content}
              onChange={handleFieldChange}
              className="border-2 border-orange-400 w-full h-80 mt-5 outline-none"
              placeholder="미방 및 욕설은 관리자에 의해 삭제될 수 있습니다."
            />

            <div className="flex justify-start">
              <input
                type="file"
                name="photo"
                onChange={handleFieldChange}
                accept=".jpg, .png, .jpeg"
              />
            </div>
          </div>
          <div className="flex justify-end my-3">
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

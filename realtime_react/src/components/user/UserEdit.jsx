import { useApiAxios } from "api/base";
import DebugStates from "components/DebugStates";
import LoadingIndicator from "components/LoadingIndicator";
import { useAuth } from "contexts/AuthContext";
import useFieldValues from "hook/usefieldValues";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UserEdit({ userId, handleDidSave }) {
  const [auth] = useAuth();

  const [reload, setReload] = useState(false);

  const [{ data: userData, loading: getLoading, error: getError }] =
    useApiAxios(
      {
        url: `/accounts/api/users/${userId}/`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${auth.access}`,
        },
      },
      { manual: !userId }
    );

  const [
    {
      loading: saveLoading,
      error: saveError,
      errorMessages: saveErrorMessages,
    },
    saveRequest,
  ] = useApiAxios(
    {
      url: `/accounts/api/users/${userId}/`,
      method: "PATCH",
      headers: { Authorization: `Bearer ${auth.access}` },
    },
    { manual: true }
  );

  const { fieldValues, handleFieldChange, setFieldValues } =
    useFieldValues(userData);

  useEffect(() => {
    saveRequest();
  }, [reload]);

  const handleSubmit = (e) => {
    e.preventDefault();
    saveRequest({
      data: fieldValues,
    }).then((response) => {
      toast.info("🦄 수정되었습니다. 재로그인 해주세요.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setReload(true);
      if (handleDidSave) handleDidSave();
    });
  };

  return (
    <div className="mt-2">
      <h2 className="text-2xl my-5">정보수정</h2>
      {(getLoading || saveLoading) && (
        <LoadingIndicator>로딩 중...</LoadingIndicator>
      )}
      {getError?.response?.status >= 400 && (
        <div className="text-red-400">데이터를 가져오는데 실패했습니다.</div>
      )}
      {saveError?.response?.status >= 400 && (
        <div className="text-red-400">데이터를 저장하는데 실패했습니다.</div>
      )}

      <form onSubmit={handleSubmit}>
        <p className="text-left ml-56">이름</p>
        <input
          type="text"
          name="username"
          value={fieldValues.username}
          onChange={handleFieldChange}
          placeholder="이름을 입력해주세요."
          className="placeholder:italic placeholder:text-slate-300 border border-gray-300 rounded w-1/2 my-1 mx-2 p-2"
        />
        {saveErrorMessages.username?.map((message, index) => (
          <p key={index} className="text-xs text-red-400">
            {message}
          </p>
        ))}

        <p className="text-left ml-56">닉네임</p>
        <input
          type="text"
          name="nickname"
          value={fieldValues.nickname}
          onChange={handleFieldChange}
          placeholder="한글 5자 이하로 입력해주세요."
          className="placeholder:italic placeholder:text-slate-300 border border-gray-300 rounded w-1/2 my-1 mx-2 p-2"
        />
        {saveErrorMessages.nickname?.map((message, index) => (
          <p key={index} className="text-xs text-red-400">
            {message}
          </p>
        ))}

        <p className="text-left ml-56">휴대폰 번호</p>
        <input
          type="text"
          name="telephone"
          value={fieldValues.telephone}
          onChange={handleFieldChange}
          placeholder="숫자만 입력해주세요. 예)01022334567"
          className="placeholder:italic placeholder:text-slate-300 border border-gray-300 rounded w-1/2 my-1 mx-2 p-2"
        />
        {saveErrorMessages.telephone?.map((message, index) => (
          <p key={index} className="text-xs text-red-400">
            {message}
          </p>
        ))}

        <div>
          <button className="bg-violet-300 w-1/2 rounded my-1 mx-2 p-2">
            수정
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

export default UserEdit;

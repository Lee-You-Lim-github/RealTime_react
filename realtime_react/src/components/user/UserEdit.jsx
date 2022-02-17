import { useApiAxios } from "api/base";
import DebugStates from "components/DebugStates";
import { useAuth } from "contexts/AuthContext";
import useFieldValues from "hook/usefieldValues";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function UserEdit({ userId, handleDidSave }) {
  const [auth] = useAuth();

  const navigate = useNavigate();

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
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    saveRequest({
      data: fieldValues,
    }).then((response) => {
      const savedUser = response.data;
      if (handleDidSave) handleDidSave(savedUser);
    });
    navigate(`/user/mypage/${userId}/`);
  };

  return (
    <div className="mt-2">
      <h2 className="text-2xl my-5">정보수정</h2>

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
        <DebugStates
          userData={userData}
          fieldValues={fieldValues}
          getLoading={getLoading}
          getError={getError}
          saveErrorMessages={saveErrorMessages}
        />
      </form>
    </div>
  );
}

export default UserEdit;

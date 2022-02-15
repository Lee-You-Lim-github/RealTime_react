import { useApiAxios } from "api/base";
import DebugStates from "components/DebugStates";
import { useAuth } from "contexts/AuthContext";
import useFieldValues from "hook/usefieldValues";
import { useNavigate } from "react-router-dom";

const INIT_FIELD_VALUES = {
  user_id: "",
  password: "",
  password2: "",
  username: "",
  nickname: "",
  telephone: "",
  authority: "0",
};

function UserJoinForm({ userId, handleDidSave }) {
  const [auth] = useAuth();
  const navigate = useNavigate();

  const [{ data: userData, loading, error }] = useApiAxios(
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
      url: !userId ? "/accounts/api/signup/" : `/accounts/api/users/${userId}/`,
      method: !userId ? "POST" : "PUT",
      headers: { Authorization: `Bearer ${auth.access}` },
    },
    { manual: true }
  );

  const { fieldValues, handleFieldChange, setFieldValues } = useFieldValues(
    userData || INIT_FIELD_VALUES
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    saveRequest({
      data: fieldValues,
    }).then((response) => {
      const savedUser = response.data;
      if (handleDidSave) handleDidSave(savedUser);
    });
  };

  return (
    <div className="mt-2">
      {!userId ? (
        <h2 className="text-2xl my-5">회원가입</h2>
      ) : (
        <h2 className="text-2xl my-5">회원정보수정</h2>
      )}

      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="radio"
            name="authority"
            value="0"
            onChange={handleFieldChange}
            className="mx-1"
          />
          <span className="mr-28">개인</span>
          <input
            type="radio"
            name="authority"
            value="1"
            onChange={handleFieldChange}
            className="mx-1"
          />
          사업자
        </div>
        <p className="text-left ml-56">아이디</p>
        <input
          type="text"
          name="user_id"
          value={fieldValues.user_id}
          onChange={handleFieldChange}
          placeholder="영문/숫자 혼합 3자 이상 입력해주세요."
          className="placeholder:italic placeholder:text-slate-300 border border-gray-300 rounded w-1/2 my-1 mx-2 p-2"
        />
        {saveErrorMessages.user_id?.map((message, index) => (
          <p key={index} className="text-xs text-red-400">
            {message}
          </p>
        ))}

        <p className="text-left ml-56">비밀번호</p>
        <input
          type="password"
          name="password"
          value={fieldValues.password}
          onChange={handleFieldChange}
          placeholder="영문/숫자/특수문자 혼합 8자 이상 입력해주세요."
          className="placeholder:italic placeholder:text-slate-300 border border-gray-300 rounded w-1/2 my-1 mx-2 p-2"
        />
        {saveErrorMessages.password?.map((message, index) => (
          <p key={index} className="text-xs text-red-400">
            {message}
          </p>
        ))}

        <p className="text-left ml-56">비밀번호 확인</p>
        <input
          type="password"
          name="password2"
          value={fieldValues.password2}
          onChange={handleFieldChange}
          placeholder="확인을 위해 동일한 비밀번호를 입력해주세요."
          className="placeholder:italic placeholder:text-slate-300 border border-gray-300 rounded w-1/2 my-1 mx-2 p-2"
        />
        {saveErrorMessages.non_field_errors?.map((message, index) => (
          <p key={index} className="text-xs text-red-400">
            {message}
          </p>
        ))}

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
          {!userId ? (
            <button className="bg-violet-300 w-1/2 rounded my-1 mx-2 p-2">
              가입
            </button>
          ) : (
            <button className="bg-violet-300 w-1/2 rounded my-1 mx-2 p-2">
              수정
            </button>
          )}
        </div>
        <div>
          <button className="bg-slate-300 w-1/2 rounded my-1 mx-2 mb-5 p-2">
            취소
          </button>
        </div>
        <DebugStates
          fieldValues={fieldValues}
          error={error}
          errorMessages={saveErrorMessages}
        />
      </form>
    </div>
  );
}

export default UserJoinForm;

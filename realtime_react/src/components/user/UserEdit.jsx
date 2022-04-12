import { useApiAxios } from "api/base";
import LoadingIndicator from "components/LoadingIndicator";
import { useAuth } from "contexts/AuthContext";
import useFieldValues from "hook/usefieldValues";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function UserEdit({ userId }) {
  const [auth, , , logout] = useAuth();

  const [reload, setReload] = useState(false);

  const navigate = useNavigate();

  const [{ data: userData, loading: getLoading, error: getError }, refetch] =
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

  useEffect(() => {
    refetch();
  }, [reload]);

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

  const { fieldValues, handleFieldChange } = useFieldValues(userData);

  const handleSubmit = (e) => {
    e.preventDefault();
    saveRequest({
      data: fieldValues,
    }).then((response) => {
      setReload(true);
      if (userData !== fieldValues) {
        alert("수정되었습니다. 재로그인 해주세요!");
        logout();
        navigate("/accounts/login/");
      } else navigate(`/user/mypage/${userId}/`);
    });
  };

  return (
    <div>
      <div className="h-[650px] bg-gradient-to-br from-white flex justify-center items-center w-full">
        <div className="bg-white px-10 py-8 w-screen shadow-md max-w-sm border-2">
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <h1 className="text-center text-2xl font-semibold text-gray-600">
                회원 정보 수정
              </h1>
              {(getLoading || saveLoading) && (
                <LoadingIndicator>로딩 중...</LoadingIndicator>
              )}
              {getError?.response?.status >= 400 && (
                <div className="text-red-400">
                  데이터를 가져오는데 실패했습니다.
                </div>
              )}
              {saveError?.response?.status >= 400 && (
                <div className="text-red-400">
                  데이터를 저장하는데 실패했습니다.
                </div>
              )}

              <div>
                <label className="text-gray-800 text-left font-semibold block my-3 ml-1 text-md">
                  이름
                </label>
                <input
                  type="text"
                  name="username"
                  value={fieldValues.username}
                  onChange={handleFieldChange}
                  placeholder="이름을 입력해주세요."
                  className="placeholder:italic placeholder:text-md placeholder:text-slate-300 w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
                />
                {saveErrorMessages.username?.map((message, index) => (
                  <p key={index} className="text-xs text-red-400">
                    {message}
                  </p>
                ))}
              </div>
              <div>
                <label className="text-gray-800 text-left font-semibold block my-3 ml-1 text-md">
                  닉네임
                </label>
                <input
                  type="text"
                  name="nickname"
                  value={fieldValues.nickname}
                  onChange={handleFieldChange}
                  placeholder="한글 5자 이하로 입력해주세요."
                  className="placeholder:italic placeholder:text-md placeholder:text-slate-300 w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
                />
                {saveErrorMessages.nickname?.map((message, index) => (
                  <p key={index} className="text-xs text-red-400">
                    {message}
                  </p>
                ))}
              </div>
              <div>
                <label className="text-gray-800 text-left font-semibold block my-3 ml-1 text-md">
                  휴대폰 번호
                </label>
                <input
                  type="text"
                  name="telephone"
                  value={fieldValues.telephone}
                  onChange={handleFieldChange}
                  placeholder="숫자만 입력해주세요. 예)01022334567"
                  className="placeholder:italic placeholder:text-md placeholder:text-slate-300 w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
                />
                {saveErrorMessages.telephone?.map((message, index) => (
                  <p key={index} className="text-xs text-orange-400">
                    {message}
                  </p>
                ))}
              </div>
            </div>
            <div>
              <button className="mt-4 w-full border-2 border-orange-400 bg-orange-400 text-white py-2 rounded-md text-lg tracking-wide hover:bg-orange-300 hover:border-orange-300">
                수정
              </button>
            </div>
          </form>
          <button
            className="mt-4 w-full bg-white text-orange-400 border-2 border-orange-300 py-2 rounded-md text-lg tracking-wide hover:text-orange-300 hover:border-orange-300"
            onClick={() => navigate(`/user/${userId}/dashboard/`)}
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserEdit;

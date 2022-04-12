import { useApiAxios } from "api/base";
import { useAuth } from "contexts/AuthContext";
import useFieldValues from "hook/usefieldValues";
import { useNavigate } from "react-router-dom";
import LoadingIndicator from "components/LoadingIndicator";
import log_in from "assets/img/loginorange.png";
import { useEffect, useState } from "react";
import DebugStates from "components/DebugStates";
import axios from "axios";

const INIT_FIELD_VALUES = { user_id: "", password: "" };

function LoginForm() {
  const navigate = useNavigate();

  const [, , login] = useAuth();

  const [userId, setUserId] = useState();

  const [{ loading, error }, requestToken] = useApiAxios(
    {
      url: "/accounts/api/token/",
      method: "POST",
    },
    { manual: true }
  );

  const { fieldValues, handleFieldChange } = useFieldValues(INIT_FIELD_VALUES);

  const handleJoin = () => {
    navigate("/accounts/userjoin/");
  };

  const [{ data }, refetch] = useApiAxios(
    {
      url: `/accounts/api/users/?user_id=${userId}&all`,
      method: "GET",
    },
    { manual: true }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserId(fieldValues.user_id);

    requestToken({ data: fieldValues })
      .then((response) => {
        const {
          access,
          refresh,
          id,
          user_id,
          username,
          nickname,
          authority,
          telephone,
          is_superuser,
        } = response.data;
        login({
          access,
          refresh,
          id,
          user_id,
          username,
          nickname,
          authority,
          telephone,
          is_superuser,
        });
        navigate("/");
      })
      .catch((error) => {
        setUserId("");
      });
  };

  useEffect(() => {
    userId &&
      refetch().then((response) => {
        if (
          response.data[0]?.is_active == false &&
          response.data[0]?.black_set.length > 0
        ) {
          alert(
            `${response.data[0]?.black_set[0]?.start_date}부터 ${response.data[0]?.black_set[0]?.end_date}까지 활동이 정지되었습니다.              (주)지금어때 공식페이지를 통해서 문의해주세요. (주)지금어때는 건강한 예약문화를 추구합니다.`
          );
        }
      });
  }, [userId]);

  return (
    <div>
      <div className="mt-6">
        {loading && <LoadingIndicator>로그인 중...</LoadingIndicator>}
        {error?.response?.status >= 400 && (
          <div className="text-red-400">
            아이디/비밀번호를 다시 확인해주세요.
          </div>
        )}
      </div>

      <div className="w-30 h-30 mt-6 mb-3 flex justify-center">
        <img src={log_in} alt="log_in" />
      </div>
      <div className="flex justify-center">
        <form onSubmit={handleSubmit} className="">
          <div className="rounded">
            <div className="text-left pt-5">ID</div>
            <div>
              <input
                type="text"
                name="user_id"
                value={fieldValues.user_id}
                onChange={handleFieldChange}
                placeholder="ID"
                className="placeholder:italic placeholder:text-stone-400 border-2 border-stone-400 w-full my-1 p-2 outline-none"
              />
            </div>
            <div className="text-left pt-5">PASSWORD</div>
            <div>
              <input
                type="password"
                name="password"
                value={fieldValues.password}
                onChange={handleFieldChange}
                placeholder="PASSWORD"
                className="placeholder:italic placeholder:text-stone-400 border-2 border-stone-400 w-full my-1 p-2 outline-none"
              />
            </div>
            <div className="mt-6">
              <button className="text-white text-lg bg-orange-400 border-2 border-orange-400 w-full">
                로그인
              </button>
            </div>
            <div className="mt-3 ml-2 flex mb-20">
              <div className="text-sm text-stone-400 mr-4 mt-1">
                회원이 되어주세요! ------------>
              </div>
              <button className="hover:text-orange-400" onClick={handleJoin}>
                [회원가입]
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;

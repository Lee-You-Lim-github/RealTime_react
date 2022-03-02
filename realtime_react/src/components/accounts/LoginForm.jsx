import { useApiAxios } from "api/base";
import { useAuth } from "contexts/AuthContext";
import useFieldValues from "hook/usefieldValues";
import { useNavigate } from "react-router-dom";
import LoadingIndicator from "components/LoadingIndicator";
import log_in from "assets/img/login.png";
import login_marker from "assets/img/login_marker.png";

const INIT_FIELD_VALUES = { user_id: "", password: "" };

function LoginForm() {
  const navigate = useNavigate();

  const [, , login] = useAuth();

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

  const handleSubmit = (e) => {
    e.preventDefault();

    requestToken({ data: fieldValues }).then((response) => {
      const {
        access,
        refresh,
        id,
        user_id,
        nickname,
        authority,
        is_superuser,
      } = response.data;
      login({
        access,
        refresh,
        id,
        user_id,
        nickname,
        authority,
        is_superuser,
      });

      console.log("access :", access);
      console.log("refresh :", refresh);
      console.log("id :", id);
      console.log("user_id :", user_id);
      console.log("nickname :", nickname);
      console.log("authority :", authority);
      console.log("is_superuser :", is_superuser);

      navigate("/");
    });
  };

  return (
    <div className="flex">
      <div className="flex justify-center w-1/2 h-96 mt-[70px]">
        <div className="w-1/4"></div>
        <img src={log_in} alt="log_in" />
      </div>

      <div className="w-1/2 mt-16">
        <div className="w-2/3">
          <div className="flex justify-center">
            <span className="text-3xl mr-2">로그인</span>
            <span className="-mt-1">
              <img src={login_marker} alt="login_marker" className="w-8 h-8" />
            </span>
          </div>

          <div className="text-sm mt-3 mb-3">
            지금어때에 오신 것을 환영합니다 :)
          </div>

          {loading && <LoadingIndicator>로그인 중...</LoadingIndicator>}
          {error?.response?.status >= 400 && (
            <div className="text-red-400">
              아이디/비밀번호를 다시 확인해주세요.
            </div>
          )}

          <form onSubmit={handleSubmit} className="">
            <div className="rounded">
              <div className="text-left pt-5 ml-3">ID</div>
              <div>
                <input
                  type="text"
                  name="user_id"
                  value={fieldValues.user_id}
                  onChange={handleFieldChange}
                  placeholder="ID"
                  className="placeholder:italic placeholder:text-slate-400 border border-gray-300 w-full rounded mx-2 my-1 p-2"
                />
              </div>
              <div className="text-left pt-5 ml-3">PASSWORD</div>
              <div>
                <input
                  type="password"
                  name="password"
                  value={fieldValues.password}
                  onChange={handleFieldChange}
                  placeholder="PASSWORD"
                  className="placeholder:italic placeholder:text-slate-400 border border-gray-300 w-full rounded mx-2 my-1 p-2"
                />
              </div>
              <div className="mt-6">
                <button className="text-white text-lg bg-violet-400 hover:bg-red-300 w-full rounded mb-1 mx-2 p-2">
                  로그인
                </button>
              </div>
              <div className="mt-1">
                <button
                  className="text-white text-lg bg-violet-400 hover:bg-red-300 w-full rounded mb-1 mx-2 p-2"
                  onClick={handleJoin}
                >
                  회원가입
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;

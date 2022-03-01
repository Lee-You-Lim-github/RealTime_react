import { useApiAxios } from "api/base";
import { useAuth } from "contexts/AuthContext";
import useFieldValues from "hook/usefieldValues";
import { useNavigate } from "react-router-dom";
import LoadingIndicator from "components/LoadingIndicator";

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
    <div className="mt-20">
      <h2 className="text-3xl">Sign in to your account</h2>
      <h3 className="text-sm mt-3 mb-5">
        Or Please proceed with membership registration
      </h3>

      {loading && <LoadingIndicator>로그인 중...</LoadingIndicator>}
      {error?.response?.status >= 400 && (
        <div className="text-red-400">아이디/비밀번호를 다시 확인해주세요.</div>
      )}

      <form onSubmit={handleSubmit} className="px-56">
        <div className="mt-12 rounded border-2 h-96 shadow-xl">
          <div className="text-left ml-64 px-28 pt-5">ID</div>
          <div>
            <input
              type="text"
              name="user_id"
              value={fieldValues.user_id}
              onChange={handleFieldChange}
              placeholder="ID"
              className="placeholder:italic placeholder:text-slate-400 border border-gray-300 rounded w-1/3 my-1 mx-2 p-2"
            />
          </div>
          <div className="text-left ml-64 px-28 pt-5">PASSWORD</div>
          <div>
            <input
              type="password"
              name="password"
              value={fieldValues.password}
              onChange={handleFieldChange}
              placeholder="PASSWORD"
              className="placeholder:italic placeholder:text-slate-400 border border-gray-300 rounded w-1/3 my-1 mx-2 p-2"
            />
          </div>
          <div className="mt-6">
            <button className="text-white text-lg bg-violet-400 hover:bg-red-300 w-1/3 rounded my-1 mx-2 p-2 focus:outline-none focus:shadow-outline">
              로그인
            </button>
          </div>
          <div className="mt-6">
            <button
              className="text-white text-lg bg-violet-400 hover:bg-red-300 w-1/3 rounded my-1 mx-2 p-2 focus:outline-none focus:shadow-outline"
              onClick={handleJoin}
            >
              회원가입
            </button>
          </div>
          <div></div>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;

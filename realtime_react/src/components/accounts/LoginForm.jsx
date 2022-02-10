import { useApiAxios } from "api/base";
import { useAuth } from "contexts/AuthContext";
import useFieldValues from "hook/usefieldValues";
import { useNavigate } from "react-router-dom";

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

  const handleSubmit = (e) => {
    e.preventDefault();

    requestToken({ data: fieldValues }).then((response) => {
      const { access, refresh, id, user_id, nickname, authority } =
        response.data;
      login({
        access,
        refresh,
        id,
        user_id,
        nickname,
        authority,
      });

      console.log("access :", access);
      console.log("refresh :", refresh);
      console.log("id :", id);
      console.log("user_id :", user_id);
      console.log("nickname :", nickname);
      console.log("authority :", authority);

      navigate("/");
    });
  };

  return (
    <div className="mt-32">
      <h2 className="text-2xl my-5">Login</h2>

      {error?.response?.status === 401 && (
        <div className="text-red-400">아이디/비밀번호를 다시 확인해주세요.</div>
      )}

      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="user_id"
            value={fieldValues.user_id}
            onChange={handleFieldChange}
            placeholder="ID"
            className="placeholder:italic placeholder:text-slate-400 border border-gray-300 rounded w-1/2 my-1 mx-2 p-2"
          />
        </div>

        <div>
          <input
            type="password"
            name="password"
            value={fieldValues.password}
            onChange={handleFieldChange}
            placeholder="PASSWORD"
            className="placeholder:italic placeholder:text-slate-400 border border-gray-300 rounded w-1/2 my-1 mx-2 p-2"
          />
        </div>

        <div>
          <button className="bg-violet-300 w-1/2 rounded my-1 mx-2 p-2">
            로그인
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;

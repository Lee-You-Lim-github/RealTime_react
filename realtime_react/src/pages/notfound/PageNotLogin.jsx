import warn from "assets/img/warn.png";
import { Link } from "react-router-dom";

function PageNotLogin() {
  return (
    <div className="flex flex-col">
      <div className="flex mx-auto px-10">
        <img className="shrink mt-28 w-44 h-44" alt="warn" src={warn} />
      </div>
      <div className="text-4xl pt-11">지금어때에 방문하신 것을 환영합니다.</div>
      <div className="text-l mt-1 pt-3">
        지금어때의 다양한 서비스 이용을 위하여 로그인을 해주시기 바랍니다.
      </div>
      <div className="py-7 flex justify-center">
        <Link
          to={`/`}
          className="border-2 border-violet-400 hover:border-red-300 text-violet-600 hover:text-red-300 mr-3 py-1 px-2 rounded focus:outline-none focus:shadow-outline"
        >
          Go Back
        </Link>
        <Link
          to={`/accounts/login/`}
          className="border-2 border-violet-400 hover:border-red-300 text-violet-600 hover:text-red-300 py-1 px-2 rounded focus:outline-none focus:shadow-outline"
        >
          로그인
        </Link>
      </div>
    </div>
  );
}

export default PageNotLogin;

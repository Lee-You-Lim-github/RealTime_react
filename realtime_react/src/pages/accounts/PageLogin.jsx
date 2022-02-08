import "../../components//Header/TopNav.css";
import LoginForm from "components/accounts/LoginForm";
import { Link } from "react-router-dom";

function PageLogin() {
  return (
    <div className="header">
      <LoginForm />
      <div>
        <button className="bg-violet-300 w-1/2 rounded my-1 mx-2 p-2">
          로그인
        </button>
      </div>
      <div>
        <Link
          to="/account/userjoin/"
          className="border-b-2 border-violet-300 w-1/5 my-1 mx-2 p-2"
        >
          회원가입
        </Link>
        <Link
          to="/account/shopjoin/"
          className="border-b-2 border-violet-300 w-1/5 my-1 mx-2 p-2"
        >
          가맹점가입
        </Link>
      </div>
    </div>
  );
}

export default PageLogin;

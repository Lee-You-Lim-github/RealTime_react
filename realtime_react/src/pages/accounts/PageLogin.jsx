import LoginForm from "components/accounts/LoginForm";
import { Link } from "react-router-dom";

function PageLogin() {
  return (
    <div>
      <LoginForm />
      <div>
        <Link
          to="/accounts/userjoin/"
          className="border-b-2 border-violet-300 w-1/2 my-1 mx-2 p-2"
        >
          회원가입
        </Link>
      </div>
    </div>
  );
}

export default PageLogin;

import UserInfo from "components/user/UserInfo";
import { useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function PageUserInfo() {
  const { userId } = useParams();

  return (
    <div>
      <ToastContainer />
      <UserInfo userId={userId} />
    </div>
  );
}

export default PageUserInfo;

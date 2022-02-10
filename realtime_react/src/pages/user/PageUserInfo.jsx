import UserInfo from "components/user/UserInfo";
import { useParams } from "react-router-dom";

function PageUserInfo() {
  const { userId } = useParams();

  return (
    <div>
      <UserInfo userId={userId} />
    </div>
  );
}

export default PageUserInfo;

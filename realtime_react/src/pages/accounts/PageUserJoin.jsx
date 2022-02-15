import UserJoinForm from "components/accounts/UserJoinForm";
import { useNavigate, useParams } from "react-router-dom";

function PageUserJoin() {
  const navigate = useNavigate();

  const { userId } = useParams();

  return (
    <div>
      <UserJoinForm
        userId={userId}
        handleDidSave={(savedUser) => navigate(`/user/mypage/${savedUser.id}/`)}
      />
    </div>
  );
}

export default PageUserJoin;

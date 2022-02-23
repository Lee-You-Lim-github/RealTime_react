import UserJoinForm from "components/accounts/UserJoinForm";
import { useNavigate, useParams } from "react-router-dom";

function PageUserJoin() {
  const navigate = useNavigate();

  return (
    <div>
      <UserJoinForm handleDidSave={() => navigate(`/accounts/login/`)} />
    </div>
  );
}

export default PageUserJoin;

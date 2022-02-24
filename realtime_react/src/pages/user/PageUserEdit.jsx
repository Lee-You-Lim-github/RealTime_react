import UserEdit from "components/user/UserEdit";
import { useAuth } from "contexts/AuthContext";
import { useNavigate, useParams } from "react-router-dom";

function PageUserEdit() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [auth, , , logout] = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/accounts/login/");
  };

  return (
    <div>
      <UserEdit userId={userId} handleDidSave={() => handleLogout()} />
    </div>
  );
}

export default PageUserEdit;

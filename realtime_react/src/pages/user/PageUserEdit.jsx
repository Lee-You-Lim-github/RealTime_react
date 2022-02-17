import UserEdit from "components/user/UserEdit";
import { useParams } from "react-router-dom";

function PageUserEdit() {
  const { userId } = useParams();

  return (
    <div>
      <UserEdit userId={userId} />
    </div>
  );
}

export default PageUserEdit;

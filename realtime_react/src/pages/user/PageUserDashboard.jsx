import UserDashboard from "components/user/UserDashboard";
import UserSidebar from "components/user/UserSidebar";
import { useParams } from "react-router-dom";

function PageAdminDashboard() {
  const { userId } = useParams();

  return (
    <div className="flex">
      <div className="w-1/6">
        <UserSidebar userId={userId} />
      </div>
      <div className="w-5/6">
        <UserDashboard userId={userId} />
      </div>
    </div>
  );
}

export default PageAdminDashboard;

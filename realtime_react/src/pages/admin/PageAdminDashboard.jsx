import AdminDashboard from "components/admin/AdminDashboard";
import Adminsidebar from "components/admin/Adminsidebar";

function PageAdminDashboard() {
  return (
    <div className="grid grid-cols-6">
      <div className="bg-orange-400 mr-10">
        <Adminsidebar />
      </div>
      <div className="grid col-span-4 auto-rows-max">
        <AdminDashboard />
      </div>
    </div>
  );
}

export default PageAdminDashboard;

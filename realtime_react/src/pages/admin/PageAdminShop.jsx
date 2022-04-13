import AdminShop from "components/admin/AdminShop";
import PageAdminsidebar from "./PageAdminsidebar";

function PageAdminShop() {
  return (
    <div className="grid grid-cols-8">
      <div className="grid col-span-2">
        <PageAdminsidebar />
      </div>
      <div className="grid col-span-3 auto-rows-max">
        <div className="mt-10">
          <AdminShop />
        </div>
      </div>
    </div>
  );
}

export default PageAdminShop;

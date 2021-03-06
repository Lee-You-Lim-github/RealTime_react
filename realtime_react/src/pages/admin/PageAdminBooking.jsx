import AdminBooking from "components/admin/AdminBooking";
import PageAdminsidebar from "./PageAdminsidebar";

function PageAdminBooking() {
  return (
    <div className="grid grid-cols-8">
      <div className="grid col-span-2">
        <PageAdminsidebar />
      </div>
      <div className="grid col-span-3 auto-rows-max">
        <div className="mt-10">
          <AdminBooking />
        </div>
      </div>
    </div>
  );
}

export default PageAdminBooking;

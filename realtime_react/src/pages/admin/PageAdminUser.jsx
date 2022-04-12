import AdminUser from "components/admin/AdminUser";
import React from "react";
import PageAdminsidebar from "./PageAdminsidebar";

function PageAdminUser() {
  return (
    <div className="grid grid-cols-8">
      <div className="grid col-span-2">
        <PageAdminsidebar />
      </div>
      <div className="grid col-span-3 auto-rows-max">
        <div className="flex mt-10"></div>
        <div>
          <AdminUser />
        </div>
      </div>
    </div>
  );
}

export default PageAdminUser;

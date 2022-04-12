import AdminwaitingList from "components/waiting/AdminwaitingList";
import PageAdminsidebar from "pages/admin/PageAdminsidebar";

function PageAdminwaitingList() {
  return (
    <div className="grid grid-cols-8">
      <div className="grid col-span-2">
        <PageAdminsidebar />
      </div>
      <div className="grid col-span-3 auto-rows-max">
        <div className="flex mt-10"></div>
        <div>
          <AdminwaitingList />
        </div>
      </div>
    </div>
  );
}

export default PageAdminwaitingList;

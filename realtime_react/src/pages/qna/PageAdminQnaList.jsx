import AdminQnaList from "components/qna/AdminQnaList";
import PageAdminsidebar from "pages/admin/PageAdminsidebar";

function PageAdminQnaList() {
  return (
    <div className="grid grid-cols-8">
      <div className="grid col-span-2">
        <PageAdminsidebar />
      </div>

      <div className="grid col-span-3 auto-rows-max">
        <div className="mt-10">
          <AdminQnaList />
        </div>
      </div>
    </div>
  );
}

export default PageAdminQnaList;

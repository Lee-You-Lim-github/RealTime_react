import AdminQnaList from "components/qna/AdminQnaList";
import PageAdminsidebar from "pages/admin/PageAdminsidebar";
import adminqna from "assets/img/adminqna.png";

function PageAdminQnaList() {
  return (
    <div className="grid grid-cols-8">
      <div className="grid col-span-2">
        <PageAdminsidebar />
      </div>

      <div className="grid col-span-5 auto-rows-max">
        <div className="flex mt-10">
          <img src={adminqna} alt="adminqna" className="w-12 h-12 mr-4" />
          <button>
            <div className="text-2xl mt-3 mb-4">1:1문의</div>
          </button>
        </div>
        <div>
          <AdminQnaList />
        </div>
      </div>
    </div>
  );
}

export default PageAdminQnaList;

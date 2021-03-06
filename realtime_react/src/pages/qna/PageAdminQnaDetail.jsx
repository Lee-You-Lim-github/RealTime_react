import AdminQnaDetail from "components/qna/AdminQnaDetail";
import { useParams } from "react-router-dom";
import adminqna from "assets/img/adminqna.png";

function PageAdminQnaDetail() {
  const { userId, qnaId } = useParams();
  return (
    <div>
      <div className="grid grid-cols-8">
        <div className="grid col-span-2"></div>
        <div className="grid col-span-4 auto-rows-max">
          <div className="flex mt-10">
            <img src={adminqna} alt="adminqna" className="w-12 h-12 mr-4" />

            <div className="text-2xl mt-3 mb-4">1:1문의</div>
          </div>
          <AdminQnaDetail userId={userId} qnaId={qnaId} />
        </div>
      </div>
    </div>
  );
}

export default PageAdminQnaDetail;

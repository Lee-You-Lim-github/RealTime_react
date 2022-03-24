import AdminQnaDetail from "components/qna/AdminQnaDetail";
import { useParams } from "react-router-dom";

function PageAdminQnaDetail() {
  const { userId, qnaId } = useParams();
  return (
    <div>
      <div>1:1문의</div>
      <div>
        <AdminQnaDetail userId={userId} qnaId={qnaId} />
      </div>
    </div>
  );
}

export default PageAdminQnaDetail;

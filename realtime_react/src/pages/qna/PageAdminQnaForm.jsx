import AdminQnaForm from "components/qna/AdminQnaForm";
import { useParams } from "react-router-dom";

function PageAdminQnaForm() {
  const { userId, qnaId } = useParams();
  return (
    <div>
      <h1>1:1문의</h1>

      <div>
        <AdminQnaForm userId={userId} qnaId={qnaId} />
      </div>
    </div>
  );
}

export default PageAdminQnaForm;

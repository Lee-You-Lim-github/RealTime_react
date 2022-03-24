import QnaForm from "components/qna/QnaForm";
import { useNavigate, useParams } from "react-router-dom";

function PageQnaForm() {
  const { userId } = useParams();
  const navigate = useNavigate();
  return (
    <div>
      <h1>1:1문의</h1>
      <QnaForm
        userId={userId}
        handleDidSave={(savedQna) =>
          navigate(`/user/${userId}/qna/${savedQna.id}/`)
        }
      />
    </div>
  );
}

export default PageQnaForm;

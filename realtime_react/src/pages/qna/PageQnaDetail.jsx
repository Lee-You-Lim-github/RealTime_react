import QnaDetail from "components/qna/QnaDetail";
import { useParams } from "react-router-dom";

function PageQnaDetail() {
  const { qnaId, userId } = useParams();
  return (
    <div>
      <QnaDetail qnaId={qnaId} userId={userId} />
    </div>
  );
}

export default PageQnaDetail;

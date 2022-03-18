import QnaList from "components/qna/QnaList";
import { useParams } from "react-router-dom";

function PageQnaList() {
  const { userId } = useParams();
  return (
    <div>
      <h1>1:1문의</h1>
      <div>
        <QnaList userId={userId} />
      </div>
    </div>
  );
}

export default PageQnaList;

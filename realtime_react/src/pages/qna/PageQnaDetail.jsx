import QnaDetail from "components/qna/QnaDetail";
import { useParams } from "react-router-dom";
import qna from "assets/img/qnaorange.png";

function PageQnaDetail() {
  const { qnaId, userId } = useParams();
  return (
    <div>
      <div className="grid grid-cols-6">
        <div className="grid col-span-1">
          <div className="flex mt-10">
            <img src={qna} alt="qna" className="w-12 h-12 mr-4 ml-20" />

            <div className="text-2xl mt-2 mb-4">1:1문의</div>
          </div>
        </div>
        <div className="grid col-span-4 auto-rows-max">
          <QnaDetail qnaId={qnaId} userId={userId} />
        </div>
      </div>
    </div>
  );
}

export default PageQnaDetail;

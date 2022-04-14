import QnaForm from "components/qna/QnaForm";
import { useNavigate, useParams } from "react-router-dom";
import qna from "assets/img/qnaorange.png";

function PageQnaForm() {
  const { userId } = useParams();
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-8">
      <div className="grid col-span-2"></div>

      <div className="grid col-span-4 auto-rows-max">
        <div className="flex mt-10">
          <img src={qna} alt="qna" className="w-12 h-12 mr-4" />
          <div className="text-2xl mt-2 mb-4">1:1문의</div>
        </div>
        <QnaForm
          userId={userId}
          handleDidSave={(savedQna) =>
            navigate(`/user/${userId}/qna/${savedQna.id}/`)
          }
        />
      </div>
    </div>
  );
}

export default PageQnaForm;

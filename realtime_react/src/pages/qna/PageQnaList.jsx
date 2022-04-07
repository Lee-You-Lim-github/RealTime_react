import QnaList from "components/qna/QnaList";
import PageUserSidebar from "pages/user/PageUserSidebar";
import { useParams } from "react-router-dom";
import qnaorange from "assets/img/qnaorange.png";

function PageQnaList() {
  const { userId } = useParams();

  return (
    <div className="grid grid-cols-8">
      <div className="grid col-span-2">
        <PageUserSidebar />
      </div>
      <div className="grid col-span-5 auto-rows-max">
        <div className="flex mt-10">
          <img src={qnaorange} alt="qnaorange" className="w-10 h-10 mr-4" />
          <button>
            <div className="text-2xl mt-1 mb-8">1:1문의</div>
          </button>
        </div>
        <div>
          <QnaList userId={userId} />
        </div>
      </div>
    </div>
  );
}

export default PageQnaList;

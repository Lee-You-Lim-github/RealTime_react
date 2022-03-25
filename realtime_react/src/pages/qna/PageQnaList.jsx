import QnaList from "components/qna/QnaList";
import PageUserSidebar from "pages/user/PageUserSidebar";
import { useParams } from "react-router-dom";

function PageQnaList() {
  const { userId } = useParams();

  return (
    <div className="grid grid-cols-8">
      <div className="grid col-span-2">
        <PageUserSidebar />
      </div>
      <div className="grid col-span-5 auto-rows-max">
        <h1>1:1문의</h1>
        <div>
          <QnaList userId={userId} />
        </div>
      </div>
    </div>
  );
}

export default PageQnaList;

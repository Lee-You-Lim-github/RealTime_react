import ReviewList from "components/review/ReviewList";
import PageUserSidebar from "pages/user/PageUserSidebar";
import { useParams } from "react-router-dom";

function PageReivewList() {
  const { userId } = useParams();
  return (
    <div className="grid grid-cols-8">
      <div className="grid col-span-2">
        <PageUserSidebar />
      </div>
      <div className="grid col-span-5 auto-rows-max">
        <ReviewList userId={userId} />
      </div>
    </div>
  );
}

export default PageReivewList;

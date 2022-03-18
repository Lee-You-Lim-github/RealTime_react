import ReviewList from "components/review/ReviewList";
import { useParams } from "react-router-dom";

function PageReivewList() {
  const { userId } = useParams();
  return (
    <div>
      <ReviewList userId={userId} />
    </div>
  );
}

export default PageReivewList;

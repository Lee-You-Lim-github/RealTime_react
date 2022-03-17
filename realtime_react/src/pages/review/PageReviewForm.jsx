import ReviewForm from "components/review/ReviewForm";
import { useParams } from "react-router-dom";

function PageReviewForm() {
  const { type, Id } = useParams();
  return (
    <div>
      <ReviewForm type={type} Id={Id} />
    </div>
  );
}

export default PageReviewForm;

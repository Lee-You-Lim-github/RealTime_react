import ReviewForm from "components/review/ReviewForm";
import { useParams } from "react-router-dom";

function PageReviewForm() {
  const { type, Id } = useParams();
  return (
    <div className="grid grid-cols-6">
      <div className="grid col-span-1"></div>
      <div className="grid col-span-4 auto-rows-max">
        <ReviewForm type={type} Id={Id} />
      </div>
    </div>
  );
}

export default PageReviewForm;

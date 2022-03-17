import DebugStates from "components/DebugStates";

function NewReviewList(reviewData) {
  return (
    <div>
      최근 리뷰
      <DebugStates reviewData={reviewData} />
    </div>
  );
}

export default NewReviewList;

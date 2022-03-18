import DebugStates from "components/DebugStates";

function NewReviewList({ reviewData }) {
  return (
    <div>
      {reviewData
        .sort(
          (newShop, newShop2) =>
            new Date(newShop2.created_at) - new Date(newShop.created_at)
        )
        .slice(0, 5)
        .map((data) => {
          return (
            <div>
              <div>{data.rating}</div>
              <div>{data.content}</div>
              <div>{data.book_id?.user_id.nickname}</div>
              <div>{data.wait_id?.user_id.nickname}</div>
            </div>
          );
        })}
      <DebugStates reviewData={reviewData} />
    </div>
  );
}

export default NewReviewList;

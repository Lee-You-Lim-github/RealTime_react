import React from "react";
import Star from "./ShopStar";
import Timestamp from "react-timestamp";

function ShopReviewComponent({ review }) {
  const { rating, user_id, content } = review;

  return (
    <React.Fragment>
      <div className="justify-items-start">
        <div className="grid grid-cols-4 gap-4 w-3/5 content-center m-auto">
          <div>
            <Star score={rating} />
          </div>
          <div>{user_id.nickname}</div>
          <div className="text-left">{content}</div>
          <div>
            <Timestamp relative date={review.created_at} autoUpdate />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default ShopReviewComponent;

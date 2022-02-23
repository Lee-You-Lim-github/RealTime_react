import React from "react";
import Star from "./ShopStar";
import Timestamp from "react-timestamp";

function ShopReviewComponent({ review }) {
  const { rating, user_id, content } = review;

  return (
    <React.Fragment>
      <div className="flex justify-center items-center">
        <div className="grid grid-cols-4 gap-2">
          <div className="">
            <Star score={rating} />
          </div>
          <div className="">{user_id.nickname}</div>
          <div className="">{content}</div>
          <div>
            <Timestamp relative date={review.created_at} autoUpdate />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default ShopReviewComponent;

import React from "react";
import Star from "./ShopStar";
import Timestamp from "react-timestamp";
import DebugStates from "components/DebugStates";
import { useParams } from "react-router-dom";

function ShopReviewComponent({ review }) {
  const { shopId } = useParams();
  const { rating, user_id, content } = review;
  console.log(rating);
  console.log(user_id);
  console.log(content);

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
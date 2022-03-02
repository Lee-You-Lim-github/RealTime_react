import React from "react";
import Star from "./ShopStar";
import Timestamp from "react-timestamp";

function ShopReviewComponent({ review }) {
  return (
    <React.Fragment>
      <ul className="list-disc">
        <li className="flex items-start">
          <p className="flex items-start mt-2 xl:text-lg">
            <Star score={review.rating} />
            <span className="ml-2">{review.user_id.nickname}</span>
          </p>
          <span className="h-6 flex items-center sm:h-7">
            <svg
              className="flex-shrink-0 h-5 w-5 text-cyan-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            ></svg>
          </span>
          <div className="ml-5 mt-2 xl:text-xl">
            <span>
              <Timestamp relative date={review.created_at} autoUpdate />
            </span>
          </div>
        </li>
        <li className="flex items-start">
          <p className="flex items-start xl:text-xl text-left">
            {review.content}
          </p>
        </li>
        <hr />
      </ul>
    </React.Fragment>
  );
}

export default ShopReviewComponent;

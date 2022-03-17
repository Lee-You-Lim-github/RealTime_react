import React from "react";
import Star from "./ShopStar";
import Timestamp from "react-timestamp";
import { useAuth } from "contexts/AuthContext";

function ShopReviewComponent({ review }) {
  const [auth] = useAuth();

  return (
    <React.Fragment>
      <div>
        <div className="flex items-start">
          <p className="flex items-start mt-2 xl:text-lg">
            <Star score={review.rating} />
            <span className="ml-2">{review.book_id.user_id.nickname}</span>
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
        </div>
        <div className="flex static mb-1">
          <span className="text-xl">{review.content}</span>

          {auth.is_superuser && (
            <span className="absolute right-20 text-right">
              <button className="border border-orange-300 text-orange-300 rounded px-1">
                삭제
              </button>
            </span>
          )}
        </div>
        <hr />
      </div>
    </React.Fragment>
  );
}

export default ShopReviewComponent;

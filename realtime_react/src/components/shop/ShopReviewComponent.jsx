import React from "react";
import Star from "./ShopStar";
import Timestamp from "react-timestamp";
import { useAuth } from "contexts/AuthContext";
import { useApiAxios } from "api/base";
import { useParams } from "react-router-dom";

function ShopReviewComponent({ review }) {
  const [auth] = useAuth();
  const { shopId } = useParams();

  const [{ loading: deleteLoading, error: deleteError }, deleteReview] =
    useApiAxios(
      {
        url: `/review/api/review/${review.id}/`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${auth.access}`,
        },
      },
      { manual: true }
    );

  const handleDelete = () => {
    if (window.confirm("Are you sure?")) {
      deleteReview({
        url: `/review/api/review/${review.id}/`,
        method: "DELETE",
      });

      alert("리뷰가 삭제되었습니다.");
      window.location.replace(`/shop/${shopId}/`);
    }
  };

  return (
    <React.Fragment>
      <div>
        <div className="flex items-start justify-between">
          <div className="flex items-start mt-2 xl:text-lg">
            <Star score={review.rating} />
            <span className="ml-2">
              {review.wait_id && review.wait_id.user_id.nickname}
              {review.book_id && review.book_id.user_id.nickname}
            </span>
          </div>

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
              <button
                onClick={handleDelete}
                className="border border-orange-300 text-orange-300 rounded px-1"
              >
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

import { useApiAxios } from "api/base";
import Star from "components/shop/ShopStar";
import { useState } from "react";
import Timestamp from "react-timestamp";

function ReviewSummary({ review, userId }) {
  const [reload, setReload] = useState(false);
  const [{ loading: deleteLoading, error: deleteError }, deletedreview] =
    useApiAxios(
      {
        url: `/review/api/review/${review.id}/`,
        method: "DELETE",
      },
      { manual: true }
    );

  const handleDelete = () => {
    if (window.confirm("삭제하시겠습니까?")) {
      deletedreview({
        url: `/review/api/review/${review.id}/`,
        method: "DELETE",
      }).then(() => {
        setReload((prevState) => !prevState);
        window.location.replace(`/user/${userId}/review`);
      });
    }
  };

  return (
    <div className="w-72 h-60 border border-stone-300 rounded overflow-hidden hover:-translate-y-1 mb-8">
      <div className="mb-2 mx-2 mt-4">
        {review?.book_id?.id && (
          <div className="flex justify-between">
            <div className="flex-shrink-0 truncate w-44 text-left text-xl font-bold">
              {review?.book_id?.shop_id.name}
            </div>
            <div className="ml-2 mt-1">{review?.book_id?.day}</div>
          </div>
        )}

        {!review?.book_id?.id && (
          <div className="flex justify-between">
            <div className="flex-shrink-0 truncate w-44 text-left text-xl font-bold">
              {review?.wait_id?.shop_id.name}
            </div>
            <div className="ml-2 mt-1">
              {review?.wait_id?.wait_date.slice(0, 10)}
            </div>
          </div>
        )}
      </div>
      <div>
        <div className="ml-3 mt-2">
          <Star score={review.rating} />
        </div>
        <div className="overflow-auto h-20 text-left mt-3 mx-3">
          {review.content}
        </div>
      </div>
      <div className="text-gray-300 text-right italic mt-3 mr-3">
        <Timestamp relative date={review.created_at} autoUpdate />
      </div>
      <div className="text-right">
        <button
          className="border-2 border-orange-400 text-orange-400 rounded px-1 mt-1 mr-3"
          onClick={handleDelete}
        >
          삭제
        </button>
      </div>
    </div>
  );
}

export default ReviewSummary;

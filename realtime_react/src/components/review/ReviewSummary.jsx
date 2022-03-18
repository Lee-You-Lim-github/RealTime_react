import { useApiAxios } from "api/base";
import Star from "components/shop/ShopStar";
import { useState } from "react";

function ReviewSummary({ review, userId, index }) {
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
    <div>
      <div className="flex justify-center">
        <div> {index + 1}</div>

        {review?.book_id?.id && (
          <div className="flex">
            <div>{review?.book_id?.shop_id.name}</div>
            <div>{review?.book_id?.day}</div>
          </div>
        )}

        {!review?.book_id?.id && (
          <div className="flex">
            <div>{review?.wait_id?.shop_id.name}</div>
            <div>{review?.wait_id?.wait_date.slice(0, 10)}</div>
          </div>
        )}
        <div>
          <Star score={review.rating} />
          <div>{review.content}</div>
          <div className="text-sm text-gray-300">
            {review.created_at.slice(0, 10)}
          </div>
        </div>

        <button
          className="w-12 h-8 bg-orange-400 text-white rounded-lg"
          onClick={handleDelete}
        >
          삭제
        </button>
      </div>
    </div>
  );
}

export default ReviewSummary;

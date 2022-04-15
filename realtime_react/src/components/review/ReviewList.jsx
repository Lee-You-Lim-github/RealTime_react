import { useApiAxios } from "api/base";
import { useEffect } from "react";
import ReviewSummary from "./ReviewSummary";
import reviewlist from "assets/img/reviewlist.png";

function ReviewList({ userId }) {
  const [{ data, loading, error }, getreview] = useApiAxios(
    {
      url: `/review/api/review/?all&user_id=${userId}`,
      method: `GET`,
    },
    { manual: true }
  );

  useEffect(() => {
    getreview().then();
  }, []);

  return (
    <div>
      {loading && "로딩 중 ..."}
      {error && "로딩 중 에러가 발생했습니다."}
      <div className="flex flex-row my-10">
        <img src={reviewlist} alt="reviewlist" className="w-10 h-10 ml-7" />
        <h1 className="text-left text-2xl ml-2 mt-1">리뷰내역</h1>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {data?.map((review, index) => (
          <ReviewSummary
            review={review}
            key={review.id}
            index={index}
            userId={userId}
          />
        ))}
      </div>
    </div>
  );
}
export default ReviewList;

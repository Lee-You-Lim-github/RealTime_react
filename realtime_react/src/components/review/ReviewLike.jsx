import { useApiAxios } from "api/base";
import DebugStates from "components/DebugStates";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

function ReviewLike() {
  const { shopId } = useParams();

  const [{ data: reviews }, refetch] = useApiAxios(
    {
      url: `/review/api/review/?all&shop_id=${shopId}`,
      method: "GET",
    },
    { manual: true }
  );

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div className="grid grid-cols-2 gap-2 my-2">
      <div className="grid grid-cols-2 border ml-20 py-2 px-5 rounded">
        <span className="text-left">음식이 맛있어요!</span>
        <span className="text-right">
          {reviews &&
            reviews.filter(({ flavor }) => flavor === "매우좋아요").length * 2 +
              reviews.filter(({ flavor }) => flavor === "좋아요").length}
        </span>
      </div>
      <div className="grid grid-cols-2 border mr-20 py-2 px-5 rounded">
        <span className="text-left">매장이 청결해요!</span>
        <span className=" text-right">
          {reviews &&
            reviews.filter(({ cleaned }) => cleaned === "매우좋아요").length *
              2 +
              reviews.filter(({ cleaned }) => cleaned === "좋아요").length}
        </span>
      </div>
      <div className="grid grid-cols-2 border ml-20 py-2 px-5 rounded">
        <span className="text-left">친절해요!</span>
        <span className="text-right">
          {reviews &&
            reviews.filter(({ kindness }) => kindness === "매우좋아요").length *
              2 +
              reviews.filter(({ kindness }) => kindness === "좋아요").length}
        </span>
      </div>
      <div className="grid grid-cols-2 border mr-20 py-2 px-5 rounded">
        <span className="text-left">분위기가 좋아요!</span>
        <span className="text-right">
          {reviews &&
            reviews.filter(({ mood }) => mood === "매우좋아요").length * 2 +
              reviews.filter(({ mood }) => mood === "좋아요").length}
        </span>
      </div>
    </div>
  );
}

export default ReviewLike;

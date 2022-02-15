import { useApiAxios } from "api/base";
import DebugStates from "components/DebugStates";
import { useAuth } from "contexts/AuthContext";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Star from "../shop/ShopStar";

function UserInfo({ userId }) {
  const [auth] = useAuth();

  const [reviewList, setReviewList] = useState([]);

  const [{ data: userData, loading, error }, refetch] = useApiAxios(
    {
      url: `/accounts/api/users/${auth.id}/`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${auth.access}`,
      },
    },
    { manual: true }
  );

  useEffect(() => {
    refetch();
  }, []);

  const [
    { data: reviewData, loading: reviewLoading, error: reviewError },
    reviewRefetch,
  ] = useApiAxios(
    {
      url: `/shop/api/reviews/`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${auth.access}`,
      },
    },
    { manual: true }
  );

  useEffect(() => {
    reviewRefetch();
  }, []);

  useEffect(() => {
    const savedReview = reviewData?.filter(
      (user_review) => parseInt(userId) === user_review.user_id.id
    );

    setReviewList(savedReview);
  }, [reviewData, userId]);

  return (
    <div>
      {userData && (
        <div className="flex flex-wrap my-3">
          <h3 className="bg-violet-300 w-1/4 text-left rounded-sm p-3">
            마이페이지
          </h3>
          <div className="border border-violet-300 w-3/5 rounded-sm p-3">
            <p className="text-left">ID : {userData.user_id}</p>
            <p className="text-left">이름 : {userData.username}</p>
            <p className="text-left">닉네임 : {userData.nickname}</p>
            <p className="text-left flex">
              휴대전화번호 : {userData.telephone}
            </p>
            <Link
              to={`/user/mypage/${auth.id}/edit/`}
              className="bg-violet-300 hover:bg-red-200 text-sm text-right rounded p-1"
            >
              수정
            </Link>
          </div>
        </div>
      )}

      <div className="flex flex-wrap my-5">
        {reviewData &&
          reviewList?.map((review) => (
            <>
              <h3 className="bg-violet-300 w-1/4 text-left rounded-sm p-3">
                리뷰 내역
              </h3>
              <div className="border border-violet-300 w-3/5 rounded-sm p-3">
                <p className="text-left">{review.shop_id.name}</p>
                <Star score={review.rating} />
                <span className="text-left">{review.content}</span>
              </div>
            </>
          ))}
      </div>

      <DebugStates
        userData={userData}
        loading={loading}
        error={error}
        reviewData={reviewData}
        reviewLoading={reviewLoading}
        reviewError={reviewError}
      />
    </div>
  );
}

export default UserInfo;

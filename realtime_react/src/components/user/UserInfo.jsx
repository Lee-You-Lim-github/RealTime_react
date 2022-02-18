import { useApiAxios } from "api/base";
import DebugStates from "components/DebugStates";
import { useAuth } from "contexts/AuthContext";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Timestamp from "react-timestamp";
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
    const savedReview = reviewData?.filter(
      (user_review) => parseInt(userId) === user_review.user_id.id
    );

    if (savedReview !== undefined) {
      setReviewList(savedReview);
    }
  }, [reviewData, userId]);

  const [{ loading: deleteLoading, error: deleteError }, deleteBooking] =
    useApiAxios(
      {
        url: `/shop/api/reviews/${reviewData?.id}/`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${auth.access}`,
        },
      },
      { manual: true }
    );

  const handleDelete = (e) => {
    e.preventDefault();
    const review_id = e.target.value;
    if (window.confirm("정말 삭제하시겠습니까?")) {
      deleteBooking({
        url: `/shop/api/reviews/${review_id}/`,
        method: "DELETE",
      });
    }
    window.location.replace(`/user/mypage/${userId}/`);
  };

  useEffect(() => {
    reviewRefetch();
  }, []);

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
            <p className="text-right">
              <Link
                to={`/user/mypage/${auth.id}/edit/`}
                className="bg-violet-300 hover:bg-red-200 text-sm text-right rounded p-2"
              >
                수정
              </Link>
            </p>
          </div>
        </div>
      )}

      {reviewList.length > 0 ? (
        <>
          {reviewList?.map((review) => (
            <div key={review.id} className="flex flex-wrap my-5">
              <h3 className="bg-violet-300 w-1/4 text-left rounded-sm p-3">
                리뷰 내역
              </h3>
              <div className="border border-violet-300 w-3/5 rounded-sm p-3">
                <p className="text-left">{review.shop_id.name}</p>
                <span>
                  <Star score={review.rating} />
                </span>
                <span className="text-left mr-20">{review.content}</span>
                <span className="text-right">
                  <Timestamp relative date={review.created_at} autoUpdate />
                </span>
                <p className="text-right">
                  <button
                    disabled={deleteLoading}
                    onClick={handleDelete}
                    value={review.id}
                    className="bg-violet-300 hover:bg-red-200 text-sm text-right rounded p-1 px-2"
                  >
                    삭제
                  </button>
                </p>
              </div>
            </div>
          ))}
        </>
      ) : (
        <div className="flex flex-wrap my-5">
          <h3 className="bg-violet-300 w-1/4 text-left rounded-sm p-3">
            리뷰 내역
          </h3>
          <div className="border border-violet-300 w-3/5 rounded-sm p-3">
            <p className="text-left">등록된 리뷰가 없습니다.</p>
          </div>
        </div>
      )}

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

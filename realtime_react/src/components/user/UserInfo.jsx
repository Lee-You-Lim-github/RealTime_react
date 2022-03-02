import { useApiAxios } from "api/base";
import DebugStates from "components/DebugStates";
import DeleteConfirmModal from "components/modal/DeleteConfirmModal";
import { useAuth } from "contexts/AuthContext";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Timestamp from "react-timestamp";
import Star from "../shop/ShopStar";
import { toast } from "react-toastify";
import LoadingIndicator from "components/LoadingIndicator";
import UserInfoComponent from "./UserInfoComponent";
import "./UserInfo.css";

function UserInfo({ userId }) {
  const [auth] = useAuth();

  const [reviewList, setReviewList] = useState([]);

  const navigate = useNavigate();

  const [reviewId, setReviewId] = useState(0);

  // confirm 모달창
  const [modalOpen, setModalOpen] = useState(false);

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
      url: `/shop/api/reviews/?all`,
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
    deleteBooking({
      url: `/shop/api/reviews/${reviewId}/`,
      method: "DELETE",
    });
    console.log("삭제 성공");
    toast.info("🦄 되었습니다.", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    window.location.replace(`/user/mypage/${userId}/`);
  };

  useEffect(() => {
    reviewRefetch();
  }, []);

  // confirm 모달 열기
  const openModal = (e) => {
    setModalOpen(true);
    setReviewId(e.target.value);
  };

  // confirm 모달 닫기
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="layout ">
      {(loading || reviewLoading) && (
        <LoadingIndicator>로딩 중...</LoadingIndicator>
      )}
      {deleteLoading && <LoadingIndicator>삭제 중...</LoadingIndicator>}
      {deleteError?.response?.status >= 400 && (
        <div className="text-red-400">삭제에 실패했습니다.</div>
      )}
      <h1 className="text-left text-2xl">마이페이지</h1>
      {userData && <UserInfoComponent userData={userData} auth={auth} />}

      {reviewList.length > 0 ? (
        <>
          {reviewList?.map((review) => (
            <div key={review.id} className="flex flex-wrap p-2">
              <div className="bg-violet-300 w-1/4 text-left rounded-sm p-3">
                리뷰 내역
              </div>
              <div className="border border-violet-300 w-3/4 rounded-sm p-3">
                <p className="text-left">{review.shop_id.name}</p>
                <span>
                  <Star score={review.rating} />
                </span>
                <span className="text-left mr-20">{review.content}</span>
                <span className="text-right">
                  <Timestamp relative date={review.created_at} autoUpdate />
                </span>
                <React.Fragment>
                  <p className="text-right">
                    <button
                      // disabled={deleteLoading}
                      onClick={openModal}
                      value={review.id}
                      className="bg-violet-300 hover:bg-red-200 text-sm text-right rounded p-1 px-2"
                    >
                      삭제
                    </button>
                  </p>
                  <DeleteConfirmModal
                    handleDelete={handleDelete}
                    open={modalOpen}
                    close={closeModal}
                    name="review_delete"
                    header="정말 삭제하시겠습니까?"
                  />
                </React.Fragment>
              </div>
            </div>
          ))}
        </>
      ) : (
        <div className="flex flex-wrap my-5">
          <h3 className="bg-violet-300 w-1/4 text-left rounded-sm p-3">
            리뷰 내역
          </h3>
          <div className="border border-violet-300 w-3/4 rounded-sm p-3">
            <p className="text-left">등록된 리뷰가 없습니다.</p>
          </div>
        </div>
      )}

      <DebugStates reviewData={reviewData} />
    </div>
  );
}

export default UserInfo;

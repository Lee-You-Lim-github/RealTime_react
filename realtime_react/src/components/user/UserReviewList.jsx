import { useAuth } from "contexts/AuthContext";
import React from "react";
import Timestamp from "react-timestamp";
import Star from "../shop/ShopStar";
import DeleteConfirmModal from "components/modal/DeleteConfirmModal";
import PageNotAccess from "pages/notfound/PageNotAccess";

function UserReviewList(props) {
  const { reviewList, openModal, closeModal, handleDelete, modalOpen } = props;
  const [auth] = useAuth();

  if (auth.authority === "0") {
    return (
      <div>
        {reviewList.length > 0 ? (
          <>
            {reviewList?.map((review) => (
              <div key={review.id} className="flex flex-wrap">
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
      </div>
    );
  } else if (auth.authority === "1") {
    return <div></div>;
  } else {
    return <PageNotAccess />;
  }
}

export default UserReviewList;

import "./ShopDetail.css";
import { useApiAxios } from "api/base";
import DebugStates from "components/DebugStates";
import Modal from "components/modal/Modal";
import { useAuth } from "contexts/AuthContext";
import useFieldValues from "hook/usefieldValues";
import React, { useCallback, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import ShopDetailComponent from "./ShopDetailComponent";
import ShopReviewComponent from "./ShopReviewComponent";
import LoadingIndicator from "components/LoadingIndicator";

const INIT_REVIEW_FIELD_VALUES = {
  content: "",
  rating: "",
};

function ShopDetail({ shopId, itemsPerPage = 5 }) {
  const [auth] = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  const [showInfo, setShowInfo] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  // paging
  const [, setItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(1);

  //reload

  // getShopData
  const [
    { data: shopData, loading: shopLoading, error: shopError },
    ShopRefetch,
  ] = useApiAxios(
    {
      url: `/shop/api/shops/${shopId}/`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${auth.access}`,
      },
    },
    { manual: true }
  );

  useEffect(() => {
    ShopRefetch();
  }, [shopId]);

  // getReviewData
  const [
    { data: reviewData, loading: reviewLoading, error: reviewError },
    reviewRefetch,
  ] = useApiAxios(
    {
      url: `/shop/api/reviews/?query=${shopId}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${auth.access}`,
      },
    },
    { manual: true }
  );

  // reviewList Paging
  const fetchApplications = useCallback(async (newPage) => {
    const params = {
      page: newPage,
    };
    const { data } = await reviewRefetch({ params });
    setPage(newPage);
    setPageCount(Math.ceil(data.count / itemsPerPage));
    setItems(data?.results);
  }, []);

  useEffect(() => {
    fetchApplications(1);
  }, [fetchApplications]);

  const handlePage = (event) => {
    fetchApplications(event.selected + 1);
  };

  const { fieldValues, handleFieldChange } = useFieldValues(
    INIT_REVIEW_FIELD_VALUES
  );

  // postReview
  const [{ loading: savedLoading, error: savedError }, requestReview] =
    useApiAxios(
      {
        url: `/shop/api/newreview/`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${auth.access}`,
        },
      },
      { manual: true }
    );

  const reviewHandleSubmit = (e) => {
    e.preventDefault();

    requestReview({
      data: {
        ...fieldValues,
        user_id: auth.id,
        shop_id: shopData.id,
      },
    }).then((response) => {
      alert("리뷰가 등록되었습니다.");
      const { rating, content } = response.data;
    });
    window.location.replace(`/shop/${shopId}/`);
  };

  useEffect(() => {
    reviewRefetch();
  }, []);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      {shopData && (
        <>
          {(shopLoading || reviewLoading) && (
            <LoadingIndicator>로딩 중...</LoadingIndicator>
          )}

          {(shopError || reviewError)?.response?.status >= 400 && (
            <div className="text-red-400 my-5">
              데이터를 불러오는데 실패했습니다.
            </div>
          )}
          {(shopError || reviewError)?.response?.status >= 400 && (
            <div className="text-red-400 my-5">
              데이터를 불러오는데 실패했습니다.
            </div>
          )}
          {savedLoading && <LoadingIndicator>저장 중...</LoadingIndicator>}
          {savedError?.response?.status >= 400 && (
            <div className="text-red-400 my-5">저장에 실패했습니다.</div>
          )}

          <br />
          <span className="text-4xl">{shopData.name}</span>
          <span className="mx-3">{shopData.category}</span>
          <span>
            잔여 테이블수: {shopData.now_table_count}/
            {shopData.total_table_count}
          </span>
          <div>
            <React.Fragment>
              <button
                className="bg-violet-300 border border-violet-300 rounded w-2/2 my-1 mx-2 p-3"
                onClick={openModal}
              >
                지금 예약
              </button>

              <Modal
                shopId={shopId}
                ShopData={shopData}
                open={modalOpen}
                close={closeModal}
                header="지금 예약"
              >
                <div className="flex justify-center">지금 예약하시겠어요?</div>
              </Modal>
            </React.Fragment>
            <Link
              to={`/shop/${shopId}/booking/new/`}
              className="bg-violet-300 border border-violet-300 rounded w-2/2 my-1 mx-2 p-3"
            >
              지금말고 예약
            </Link>
          </div>
          <br />

          <div className="photo_align">
            <img
              src={shopData.photo}
              alt={shopData.name}
              className="shopphoto rounded"
            />
          </div>
          <br />
          <br />
          <div>
            <p>공지사항</p>
            {shopData.notice}
          </div>
        </>
      )}
      <button
        onClick={() => setShowInfo(true)}
        onClickCapture={() => setShowMenu(false)}
        className="bg-violet-300 border border-violet-300 rounded w-2/2 my-1 mx-2 p-2"
      >
        매장정보
      </button>
      <button
        onClick={() => setShowMenu(true)}
        onClickCapture={() => setShowInfo(false)}
        className="bg-violet-300 border border-violet-300 rounded w-2/2 my-1 mx-2 p-2"
      >
        리뷰보기
      </button>
      <br />
      <br />

      {showInfo && shopData && (
        <div>
          <ShopDetailComponent shopinfo={shopData} />
        </div>
      )}

      {showMenu && reviewData && (
        <div>
          {reviewData?.results
            ?.filter(
              (review_shop) => review_shop.shop_id.id === parseInt(shopId)
            )
            .map((review) => {
              return <ShopReviewComponent key={review.id} review={review} />;
            })}
          <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePage}
            pageRangeDisplayed={itemsPerPage}
            pageCount={pageCount}
            previousLabel="<"
            renderOnZeroPageCount={null}
            className="pagination"
          />
        </div>
      )}

      {reviewData && (
        <>
          <br />
          <br />
          <form onSubmit={reviewHandleSubmit}>
            <div>리뷰작성</div>
            <input
              type="number"
              name="rating"
              value={fieldValues.rating}
              onChange={handleFieldChange}
              placeholder="0"
              min="0"
              max="5"
            />
            <span>{reviewData.nickname}</span>
            <input
              type="text"
              name="content"
              value={fieldValues.content}
              onChange={handleFieldChange}
              placeholder="리뷰를 작성해주세요"
            />
            <button className="bg-violet-300 border border-violet-300 rounded w-2/2 my-1 mx-2 p-2">
              저장하기
            </button>
          </form>
          <br />
          <br />
        </>
      )}

      <DebugStates fieldValues={fieldValues} reviewData={reviewData} />
    </div>
  );
}

export default ShopDetail;

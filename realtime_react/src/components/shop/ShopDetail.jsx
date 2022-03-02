import { useApiAxios } from "api/base";
import Modal from "components/modal/Modal";
import { useAuth } from "contexts/AuthContext";
import useFieldValues from "hook/usefieldValues";
import React, { useCallback, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import ShopDetailComponent from "./ShopDetailComponent";
import ShopReviewComponent from "./ShopReviewComponent";
import LoadingIndicator from "components/LoadingIndicator";
import noimages from "assets/img/noimages.png";

const INIT_REVIEW_FIELD_VALUES = {
  content: "",
  rating: "",
};

function ShopDetail({ shopId, itemsPerPage = 5 }) {
  const [auth] = useAuth();
  const [showReview, setShowReview] = useState(false);
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
      url: `/shop/api/reviews/`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${auth.access}`,
      },
    },
    { manual: true }
  );

  // reviewList Paging
  const fetchApplications = useCallback(
    async (newPage) => {
      const params = {
        page: newPage,
        query: shopData.name,
      };
      const { data } = await reviewRefetch({ params });
      setPage(newPage);
      setPageCount(Math.ceil(data.count / itemsPerPage));
      setItems(data?.results);
    },
    [shopData]
  );

  useEffect(() => {
    fetchApplications(1);
  }, [fetchApplications, showReview]);

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

  const alertFull = () => {
    alert("만석입니다.");
  };

  const notice_null = (a) => {
    if (a === "NULL" || !shopData.notice) {
      return "등록된 공지가 없습니다.";
    } else {
      return `${shopData.notice}`;
    }
  };

  return (
    <div>
      {shopData && (
        <section className="text-gray-800 body-font flex">
          <div className="flex flex-grow justify-center w-2/5">
            <div>
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

              <div className="mt-10 ml-4 mb-4 title-font font-medium">
                <span className="text-4xl">{shopData.name}</span>
                <span className="mx-3">{shopData.category}</span>
                <span>
                  <React.Fragment>
                    {shopData.now_table_count !== shopData.total_table_count &&
                      shopData.holiday == 0 && (
                        <button
                          className="bg-violet-400 border border-violet-400 hover:border-red-300 hover:bg-red-300 text-white rounded w-2/2 my-1 mx-1 p-2"
                          onClick={openModal}
                        >
                          지금예약‼
                        </button>
                      )}

                    {shopData.now_table_count === shopData.total_table_count &&
                      shopData.holiday == 0 && (
                        <button
                          className="bg-violet-400 border border-violet-400 hover:border-red-300 hover:bg-red-300 text-white rounded w-2/2 my-1 mx-1 p-2"
                          onClick={alertFull}
                        >
                          지금예약‼
                        </button>
                      )}

                    {shopData.holiday == 1 && (
                      <button
                        disabled=""
                        className="bg-gray-400 border border-gray-400 hover:border-gray-300 hover:bg-gray-300 text-white rounded w-2/2 my-1 mx-1 p-2"
                        onClick={(e) => {
                          e.preventDefault();
                          e.currentTarget.disabled = true;
                        }}
                      >
                        휴일
                      </button>
                    )}

                    <Modal
                      shopId={shopId}
                      ShopData={shopData}
                      open={modalOpen}
                      close={closeModal}
                      header="지금 예약"
                    >
                      <div className="flex justify-center">
                        지금 예약하시겠어요?
                      </div>
                    </Modal>
                  </React.Fragment>
                </span>
                <span className="mx-2 mt-3">
                  <Link
                    to={`/shop/${shopId}/booking/new/`}
                    className="bg-violet-400 border border-violet-400 hover:border-red-300 hover:bg-red-300 text-white rounded w-2/2 p-3"
                  >
                    지금말고예약
                  </Link>
                </span>
                <p className="flex justify-start mb-3">
                  잔여 테이블수: {shopData.now_table_count}/
                  {shopData.total_table_count}
                </p>
                <div class="mb-5">
                  {!shopData?.photo ? (
                    <img
                      className="rounded h-80"
                      src={noimages}
                      alt="no_images"
                    />
                  ) : (
                    <img
                      className="rounded"
                      src={shopData.photo}
                      alt={shopData.name}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="relativ flex flex-col w-3/5">
            <div class="">
              <ul className="">
                <li className="flex justify-center">
                  <div className="text-xl border border-violet-400 p-2 mx-2 mt-10 w-5/6">
                    <div className="text-left pl-3">공지사항 :</div>
                    <div>{notice_null(shopData?.notice)}</div>
                  </div>
                </li>
                <div className="my-2">
                  <button
                    onClick={() => setShowInfo(true)}
                    onClickCapture={() => setShowReview(false)}
                    className="bg-violet-400 border border-violet-400 text-white rounded w-2/2 my-1 mx-2 p-2 focus:bg-white focus:text-violet-400"
                  >
                    매장정보
                  </button>
                  <button
                    onClick={() => setShowReview(true)}
                    onClickCapture={() => setShowInfo(false)}
                    className="bg-violet-400 border border-violet-400 text-white rounded w-2/2 my-1 mx-2 p-2 focus:bg-white focus:text-violet-400"
                  >
                    리뷰보기
                  </button>
                </div>

                {showInfo && shopData && (
                  <div className="flex justify-center">
                    <ShopDetailComponent shopinfo={shopData} />
                  </div>
                )}

                {showReview && reviewData && (
                  <>
                    <div className="flex justify-center mb-3">
                      <div className="w-5/6">
                        <hr />
                        {reviewData?.results
                          ?.filter(
                            (review_shop) =>
                              review_shop.shop_id.id === parseInt(shopId)
                          )
                          .map((review) => {
                            return (
                              <ShopReviewComponent
                                key={review.id}
                                review={review}
                              />
                            );
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
                    </div>

                    <div>
                      <form onSubmit={reviewHandleSubmit}>
                        <input
                          type="number"
                          name="rating"
                          value={fieldValues.rating}
                          onChange={handleFieldChange}
                          placeholder="0"
                          min="0"
                          max="5"
                          className="border border-violet-400 rounded my-1 mx-1 p-1"
                        />
                        <span>{reviewData.nickname}</span>
                        <input
                          type="text"
                          name="content"
                          value={fieldValues.content}
                          onChange={handleFieldChange}
                          placeholder="리뷰를 작성해주세요"
                          className="border border-violet-400 rounded my-1 mx-1 p-1"
                        />
                        <button className="bg-violet-400 border border-violet-400 text-white rounded w-2/2 my-1 mx-1 p-1">
                          저장하기
                        </button>
                      </form>
                    </div>
                  </>
                )}
              </ul>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default ShopDetail;

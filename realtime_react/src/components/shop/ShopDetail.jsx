import { useApiAxios } from "api/base";
import Modal from "components/modal/Modal";
import { useAuth } from "contexts/AuthContext";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import ShopDetailComponent from "./ShopDetailComponent";
import ShopReviewComponent from "./ShopReviewComponent";
import LoadingIndicator from "components/LoadingIndicator";
import noimages from "assets/img/noimages.png";
import PickToggle from "components/pick/PickToggle";
import ReviewLike from "components/review/ReviewLike";
import WaitingModal from "components/modal/WaitingModal";
import ShopTotalWaiting from "components/waiting/ShopTotalWaiting";
import DontWaitingModal from "components/modal/DontWaitingModal";

function ShopDetail({ shopId, itemsPerPage = 5 }) {
  const [auth] = useAuth();
  const [showReview, setShowReview] = useState(false);
  const [showInfo, setShowInfo] = useState(true);
  const [reloadReview, setReloadReview] = useState(false);

  // modal
  const [modalOpen, setModalOpen] = useState(false);
  const [waitModalOpen, setWaitModalOpen] = useState(false);
  const [dontWaitModal, setDontWaitModal] = useState(false);

  // paging
  const [items, setItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);

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

  // getWait
  const [{ data: waits }, waitRefetch] = useApiAxios(
    {
      url: `/waiting/api/waitings/?all&user_id=${auth.id}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${auth.access}`,
      },
    },
    { manual: true }
  );

  // getPickData
  const [{ data: pickData }, getPick] = useApiAxios(
    {
      url: `/user/api/picks/?user_id=${auth.id}&shop_id=${shopId}`,
      method: "GET",
    },
    { manual: true }
  );

  useEffect(() => {
    waitRefetch();
    ShopRefetch();
  }, [ShopRefetch, waitRefetch]);

  useEffect(() => {
    shopData && getPick();
  }, [auth, shopData, getPick]);

  const reload = () => {
    getPick();
    ShopRefetch();
  };

  // getReviewData
  const [
    { data: reviewData, loading: reviewLoading, error: reviewError },
    reviewRefetch,
  ] = useApiAxios(
    {
      url: `/review/api/review/?${
        page ? "page=" + (page + 1) : "page=1"
      }&shop_id=${shopId}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${auth.access}`,
      },
    },
    { manual: true }
  );

  // reviewList Paging
  useEffect(() => {
    reviewRefetch()
      .then(({ data }) => {
        setPageCount(Math.ceil((data?.count ? data.count : 1) / itemsPerPage));
        setItems(data?.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [reloadReview]);

  const handlePage = (event) => {
    setPage(event.selected);
  };

  useEffect(() => {
    setReloadReview((prevState) => !prevState);
  }, [page]);

  const notice_null = (a) => {
    if (a === "NULL" || !shopData.notice) {
      return "등록된 공지가 없습니다.";
    } else {
      return `${shopData.notice}`;
    }
  };

  // comst today = new Date.now();
  const today = new Date();
  const year = today.getFullYear();
  const month = ("0" + (today.getMonth() + 1)).slice(-2);
  const day = ("0" + today.getDate()).slice(-2);

  const dateString = year + "-" + month + "-" + day;

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

              <div className="mt-10 ml-4 mb-4 title-font font-medium">
                <span className="text-4xl">{shopData.name}</span>
                <span className="mx-3">{shopData.category}</span>
                <span>
                  <React.Fragment>
                    {shopData.now_table_count !== shopData.total_table_count &&
                      shopData.holiday == 0 && (
                        <button
                          className="bg-violet-400 border border-violet-400 hover:border-red-300 hover:bg-red-300 text-white rounded w-2/2 my-1 mx-1 p-2"
                          onClick={() => setModalOpen(true)}
                        >
                          지금예약‼
                        </button>
                      )}

                    {shopData.now_table_count === shopData.total_table_count &&
                      shopData.holiday == 0 &&
                      waits?.filter(
                        (wait) =>
                          wait.wait_visit_status === "0" &&
                          wait.wait_cancel === "0" &&
                          wait.wait_date.slice(0, -16) === dateString
                      ).length === 1 && (
                        <button
                          className="bg-violet-400 border border-violet-400 hover:border-red-300 hover:bg-red-300 text-white rounded w-2/2 my-1 mx-1 p-2"
                          onClick={() => setDontWaitModal(true)}
                        >
                          줄서기‼
                        </button>
                      )}

                    {shopData.now_table_count === shopData.total_table_count &&
                      shopData.holiday == 0 &&
                      waits?.filter(
                        (wait) =>
                          wait.wait_visit_status === "0" &&
                          wait.wait_cancel === "0" &&
                          wait.wait_date.slice(0, -16) === dateString
                      ).length !== 1 && (
                        <button
                          className="bg-violet-400 border border-violet-400 hover:border-red-300 hover:bg-red-300 text-white rounded w-2/2 my-1 mx-1 p-2"
                          onClick={() => setWaitModalOpen(true)}
                        >
                          줄서기‼
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
                      close={() => setModalOpen(false)}
                      header="지금 예약"
                    >
                      <div className="flex justify-center">
                        지금 예약하시겠어요?
                      </div>
                    </Modal>
                    <WaitingModal
                      shopId={shopId}
                      open={waitModalOpen}
                      close={() => setWaitModalOpen(false)}
                      header="줄서기"
                    >
                      <div>
                        <p>
                          줄서기 등록시 다른 매장의 줄서기는 이용하실 수
                          없습니다.
                        </p>
                        <p>줄서기 하시겠습니까?</p>
                      </div>
                    </WaitingModal>
                    <DontWaitingModal
                      shopId={shopId}
                      open={dontWaitModal}
                      close={() => setDontWaitModal(false)}
                      header="줄서기"
                    >
                      <div>
                        <p>대기는 1건만 가능하며,</p>
                        <p>대기취소 후에 새로운 대기가 가능합니다. </p>
                      </div>
                    </DontWaitingModal>
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
                <div className="mb-3">
                  {shopData.holiday != 1 && (
                    <span className="mx-3">
                      잔여 테이블수: {shopData.now_table_count}/
                      {shopData.total_table_count}
                    </span>
                  )}

                  {shopData.now_table_count === shopData.total_table_count && (
                    <span>
                      현재 대기 <ShopTotalWaiting /> 팀
                    </span>
                  )}
                </div>

                <div className="flex">
                  <span className="select-none">찜하기</span>
                  <div className="mx-1 hover:scale-110">
                    <PickToggle
                      shop={shopData}
                      pick={pickData && pickData[0]}
                      user_id={auth.id}
                      getPick={getPick}
                      reload={reload}
                    />
                  </div>
                </div>

                <div className="relative overflow-hidden">
                  <div className="mb-5 flex flex-row animate-slider">
                    {!shopData?.photo1 ? (
                      <img
                        className="rounded h-80"
                        src={noimages}
                        alt="no_images"
                      />
                    ) : (
                      <img
                        className="rounded"
                        src={shopData.photo1}
                        alt={shopData.name}
                      />
                    )}
                    {!shopData?.photo2 ? (
                      <img
                        className="rounded h-80"
                        src={noimages}
                        alt="no_images"
                      />
                    ) : (
                      <img
                        className="rounded"
                        src={shopData.photo2}
                        alt={shopData.name}
                      />
                    )}
                    {!shopData?.photo3 ? (
                      <img
                        className="rounded h-80"
                        src={noimages}
                        alt="no_images"
                      />
                    ) : (
                      <img
                        className="rounded"
                        src={shopData.photo3}
                        alt={shopData.name}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relativ flex flex-col w-3/5">
            <div>
              <ul className="">
                <li className="flex justify-center">
                  <div className="text-xl border border-violet-400 p-2 mx-2 mt-10 w-5/6">
                    <div className="text-left pl-3">공지사항 :</div>
                    <div>{notice_null(shopData?.notice)}</div>
                  </div>
                </li>
                <div>
                  <ReviewLike />
                </div>
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
                              review_shop.book_id.shop_id.id ===
                              parseInt(shopId)
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

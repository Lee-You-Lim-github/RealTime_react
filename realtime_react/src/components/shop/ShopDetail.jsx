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
import WaitStop from "components/modal/WaitStop";

function ShopDetail({ shopId, itemsPerPage = 5 }) {
  const [auth] = useAuth();
  const [showReview, setShowReview] = useState(false);
  const [showInfo, setShowInfo] = useState(true);
  const [reloadReview, setReloadReview] = useState(false);

  // modal
  const [modalOpen, setModalOpen] = useState(false);
  const [waitModalOpen, setWaitModalOpen] = useState(false);
  const [dontWaitModal, setDontWaitModal] = useState(false);
  const [waitStop, setWaitStop] = useState(false);

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
      .catch((error) => {});
  }, [reloadReview]);

  const handlePage = (event) => {
    setPage(event.selected);
  };

  useEffect(() => {
    setReloadReview((prevState) => !prevState);
  }, [page]);

  const notice_null = (a) => {
    if (a === "NULL" || !shopData.notice) {
      return "????????? ????????? ????????????.";
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
                <LoadingIndicator>?????? ???...</LoadingIndicator>
              )}
              {(shopError || reviewError)?.response?.status >= 400 && (
                <div className="text-red-400 my-5">
                  ???????????? ??????????????? ??????????????????.
                </div>
              )}

              <div className="my-10">
                <div className="flex mb-3">
                  <span className="hover:scale-110 mr-1 mt-0.5">
                    <PickToggle
                      shop={shopData}
                      pick={pickData && pickData[0]}
                      user_id={auth.id}
                      getPick={getPick}
                      reload={reload}
                    />
                  </span>
                  <span className="text-4xl">{shopData.name}</span>
                  <span className="ml-2 mt-3">{shopData.category}</span>
                </div>

                <div className="mb-3">
                  <span>
                    <React.Fragment>
                      {auth.authority === "0" &&
                        !auth.is_superuser &&
                        shopData.now_table_count !==
                          shopData.total_table_count &&
                        shopData.holiday == 0 && (
                          <button
                            className="bg-orange-400 text-white rounded w-2/2 my-1 mx-1 p-2"
                            onClick={() => setModalOpen(true)}
                          >
                            ???????????????
                          </button>
                        )}

                      {auth.authority === "0" &&
                        !auth.is_superuser &&
                        shopData.now_table_count ===
                          shopData.total_table_count &&
                        shopData.holiday == 0 &&
                        shopData.wait_state === "0" &&
                        waits?.filter(
                          (wait) =>
                            wait.wait_visit_status === "0" &&
                            wait.wait_cancel === "0" &&
                            wait.wait_date.slice(0, -16) === dateString
                        ).length === 1 && (
                          <button
                            className="bg-orange-400 text-white rounded w-2/2 my-1 mx-1 p-2"
                            onClick={() => setDontWaitModal(true)}
                          >
                            ????????????
                          </button>
                        )}

                      {auth.authority === "0" &&
                        !auth.is_superuser &&
                        shopData.now_table_count ===
                          shopData.total_table_count &&
                        shopData.holiday == 0 &&
                        shopData.wait_state === "0" &&
                        waits?.filter(
                          (wait) =>
                            wait.wait_visit_status === "0" &&
                            wait.wait_cancel === "0" &&
                            wait.wait_date.slice(0, -16) === dateString
                        ).length !== 1 && (
                          <button
                            className="bg-orange-400 text-white rounded w-2/2 my-1 mx-1 p-2"
                            onClick={() => setWaitModalOpen(true)}
                          >
                            ????????????
                          </button>
                        )}

                      {auth.authority === "0" &&
                        !auth.is_superuser &&
                        shopData.now_table_count ===
                          shopData.total_table_count &&
                        shopData.holiday == 0 &&
                        shopData.wait_state === "1" &&
                        waits?.filter(
                          (wait) =>
                            wait.wait_visit_status === "0" &&
                            wait.wait_cancel === "0" &&
                            wait.wait_date.slice(0, -16) === dateString
                        ).length !== 1 && (
                          <button
                            className="bg-orange-400 text-white rounded w-2/2 my-1 mx-1 p-2"
                            onClick={() => setWaitStop(true)}
                          >
                            ????????????
                          </button>
                        )}

                      {shopData.holiday == 1 && (
                        <button
                          disabled=""
                          className="bg-stone-400 text-white rounded w-2/2 my-1 mx-1 p-2"
                          onClick={(e) => {
                            e.preventDefault();
                            e.currentTarget.disabled = true;
                          }}
                        >
                          ??????
                        </button>
                      )}

                      <Modal
                        shopId={shopId}
                        ShopData={shopData}
                        open={modalOpen}
                        close={() => setModalOpen(false)}
                        header="?????? ??????"
                      >
                        <div className="flex justify-center">
                          ?????? ?????????????????????????
                        </div>
                      </Modal>

                      <WaitingModal
                        shopId={shopId}
                        open={waitModalOpen}
                        close={() => setWaitModalOpen(false)}
                        header="?????????"
                      >
                        <div>
                          <p>
                            ????????? ????????? ?????? ????????? ???????????? ???????????? ???
                            ????????????.
                          </p>
                          <p>????????? ???????????????????</p>
                        </div>
                      </WaitingModal>

                      <DontWaitingModal
                        shopId={shopId}
                        open={dontWaitModal}
                        close={() => setDontWaitModal(false)}
                        header="?????????"
                      >
                        <div>
                          <p>????????? 1?????? ????????????,</p>
                          <p>???????????? ?????? ????????? ????????? ???????????????. </p>
                        </div>
                      </DontWaitingModal>

                      <WaitStop
                        shopId={shopId}
                        open={waitStop}
                        close={() => setWaitStop(false)}
                        header="?????????"
                      >
                        <div>
                          <p>?????? ????????? ????????? ????????? ?????? ????????????.</p>
                          <p>????????? ?????? ??????????????????. </p>
                        </div>
                      </WaitStop>
                    </React.Fragment>
                  </span>

                  <span className="mx-2 mt-3">
                    {auth.authority === "0" && !auth.is_superuser && (
                      <Link
                        to={`/shop/${shopId}/booking/new/`}
                        className="bg-orange-400 border border-orange-400 text-white rounded w-2/2 p-3"
                      >
                        ??????????????????
                      </Link>
                    )}
                  </span>
                </div>
                <div className="mb-3">
                  {shopData.holiday != 1 && (
                    <span className="mx-3">
                      ?????? ????????????: {shopData.now_table_count}/
                      {shopData.total_table_count}
                    </span>
                  )}

                  {shopData.now_table_count === shopData.total_table_count && (
                    <span>
                      ?????? ?????? <ShopTotalWaiting /> ???
                    </span>
                  )}
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
            <div className="flex justify-center">
              <div className="text-lg border border-orange-400 p-2 mx-2 mt-10 mb-5 w-5/6">
                <span className="text-left">????????????: </span>
                <span>{notice_null(shopData?.notice)}</span>
              </div>
            </div>
            <div>
              <ReviewLike />
            </div>
            <div className="my-2">
              <button
                onClick={() => setShowInfo(true)}
                onClickCapture={() => setShowReview(false)}
                className="bg-orange-400 border border-orange-400 text-white rounded w-2/2 my-1 mx-2 p-2 focus:bg-white focus:text-orange-400"
              >
                ????????????
              </button>
              <button
                onClick={() => setShowReview(true)}
                onClickCapture={() => setShowInfo(false)}
                className="bg-orange-400 border border-orange-400 text-white rounded w-2/2 my-1 mx-2 p-2 focus:bg-white focus:text-orange-400"
              >
                ????????????
              </button>
            </div>

            {showInfo && shopData && (
              <div className="flex justify-center">
                <div className="w-5/6 mx-3">
                  <ShopDetailComponent shopinfo={shopData} />
                </div>
              </div>
            )}

            {showReview && reviewData && (
              <>
                <div className="flex justify-center mb-3">
                  <div className="w-4/5">
                    <hr />

                    {items?.map((review, index) => (
                      <ShopReviewComponent
                        review={review}
                        key={review.id}
                        index={index}
                        shopId={shopId}
                      />
                    ))}

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
          </div>
        </section>
      )}
    </div>
  );
}

export default ShopDetail;

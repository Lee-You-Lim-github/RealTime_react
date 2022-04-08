import { useApiAxios } from "api/base";
import Map from "components/map/Map";
import NewReviewList from "components/map/NewReviewList";
import NewShopList from "components/map/NewShopList";
import { useAuth } from "contexts/AuthContext";

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DirectionModal from "components/modal/DirectionModal";
import WaitingStatus from "components/waiting/WaitingStatus";

import map from "assets/img/map.png";
import maporange from "assets/img/locationorange.png";
import shop from "assets/img/shop.png";
import shoporange from "assets/img/shoporange.png";
import star from "assets/img/star.png";
import starorange from "assets/img/starorange.png";

function PageIndex() {
  const [auth] = useAuth();
  const [query, setQuery] = useState();
  const [reload, setReload] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [mapListHover, setMapListHover] = useState(false);
  const [shopListHover, setShopListHover] = useState(false);
  const [reviewListHover, setReviewListHover] = useState(false);
  const [{ data: getData, loading, error }, refetch] = useApiAxios(
    {
      url: `/shop/api/shops/?all${query ? "&query=" + query : ""}`,
      method: "GET",
    },
    { manual: true }
  );

  const [
    { data: listData, loading: listLoding, error: listError },
    listRefetch,
  ] = useApiAxios(
    {
      url: `/shop/api/shops/?all`,
      method: "GET",
    },
    { manual: true }
  );

  const [
    { data: reviewData, loading: reviewLoading, Error: reviewError },
    reviewRefetch,
  ] = useApiAxios(
    {
      url: `/review/api/review/?all`,
      method: "GET",
    },
    { manual: true }
  );

  const [
    { data: pickData, loading: pickLoading, Error: pickError },
    pickRefetch,
  ] = useApiAxios(
    {
      url: `/user/api/picks/?user_id=${auth.id}`,
      method: "GET",
    },
    { manual: true }
  );

  useEffect(() => {
    refetch();
    reviewRefetch();
    listRefetch();
    pickRefetch();
  }, []);

  const getQuery = (e) => {
    const { value } = e.target;
    setQuery(value);
  };

  const searchShop = (e) => {
    if (e.key === "Enter") {
      const { value } = e.target;
      setQuery(value);
      setReload((prevState) => !prevState);
    }
    refetch();
  };

  useEffect(() => {
    refetch().then();
  }, [reload]);

  const scrollUp = () => {
    window.scrollTo(0, 0);
  };

  const scrollDown = () => {
    window.scrollTo(0, document.body.scrollHeight);
  };

  const scrollShop = () => {
    window.scrollTo(0, 540);
  };

  const scrollReview = () => {
    window.scrollTo(0, 1100);
  };

  const openModal = () => {
    setModalOpen(true);
  };

  // confirm 모달 닫기
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <div className="text-white">.</div>
      <div className="flex justify-center">
        <button
          onClick={openModal}
          className="border-2 border-gray-400 bg-gray-400 text-white"
        >
          사용 안내
        </button>
        <DirectionModal
          open={modalOpen}
          close={closeModal}
          name="not_now_booking"
          header="사용 안내"
        ></DirectionModal>
      </div>
      <div className="shadow-lg shadow-gray-500/80">
        <div className="search ml-[280px] mt-6 ">
          <div className="input-group flex flex-wrap items-stretch w-full rounded">
            <input
              className="w-60 h-9"
              type="search"
              onChange={getQuery}
              placeholder="       매장을 검색해주세요."
              onKeyPress={searchShop}
            />
            <span
              className="input-group-text flex items-center px-3 py-1.5 text-base font-normal text-gray-700 text-center whitespace-nowrap rounded"
              id="basic-addon2"
            >
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="search"
                className="w-4"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
                ></path>
              </svg>
            </span>
          </div>
        </div>
      </div>
      <div className="page flex justify-center ml-14 mt-4">
        {getData && <Map getData={getData} pickData={pickData} />}
      </div>
      {listData && <NewShopList listData={listData} />}
      {reviewData && <NewReviewList reviewData={reviewData} />}
      <div className="floating">
        {" "}
        <div className="mt-3">
          <button onClick={scrollUp}>
            <p
              onMouseOver={() => setMapListHover(true)}
              onMouseOut={() => setMapListHover(false)}
            >
              <img
                src={mapListHover ? maporange : map}
                width="30px"
                height="30px"
              />
            </p>
          </button>
        </div>{" "}
        <div className="mt-6">
          <button onClick={scrollShop}>
            <p
              onMouseOver={() => setShopListHover(true)}
              onMouseOut={() => setShopListHover(false)}
            >
              <img
                src={shopListHover ? shoporange : shop}
                width="30px"
                height="30px"
              />
            </p>
          </button>
        </div>{" "}
        <div className="mt-6">
          {" "}
          <button onClick={scrollReview}>
            <p
              onMouseOver={() => setReviewListHover(true)}
              onMouseOut={() => setReviewListHover(false)}
            >
              <img
                src={reviewListHover ? starorange : star}
                width="30px"
                height="30px"
              />
            </p>
          </button>
        </div>{" "}
      </div>
      <div>
        {/* className="fixed left-[1370px] bottom-[100px]" */}
        <WaitingStatus />
      </div>
    </>
  );
}

export default PageIndex;

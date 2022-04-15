import { useApiAxios } from "api/base";
import Map from "components/map/Map";
import NewReviewList from "components/map/NewReviewList";
import NewShopList from "components/map/NewShopList";
import { useAuth } from "contexts/AuthContext";

import React, { useEffect, useState } from "react";
import DirectionModal from "components/modal/DirectionModal";
import WaitingStatus from "components/waiting/WaitingStatus";

import map from "assets/img/map.png";
import maporange from "assets/img/locationorange.png";
import shop from "assets/img/shop.png";
import shoporange from "assets/img/shoporange.png";
import star from "assets/img/star.png";
import starorange from "assets/img/starorange.png";
import click from "assets/img/click.png";

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
          className="flex border-2 border-gray-400 bg-gray-400 text-white rounded"
        >
          <div className="ml-2 mr-2 mt-1 mb-1">사용 안내</div>

          <img
            src={click}
            width="20px"
            height="20px"
            className="mr-2 mt-1 mb-1"
          />
        </button>
        <DirectionModal
          open={modalOpen}
          close={closeModal}
          name="not_now_booking"
          header="사용 안내"
        ></DirectionModal>
      </div>
      <div className="shadow-lg shadow-gray-500/80">
        <div className="search ml-[280px] mt-6">
          {/* <div className="input-group flex flex-wrap items-stretch w-60 h-8 bg-white rounded hover:border-2 border-orange-400 outline-none"> */}
          <input
            className="w-60 h-8 mt-1 input-group flex flex-wrap items-stretch w-60 bg-white rounded focus:border-2 border-orange-400 outline-none "
            type="search"
            onChange={getQuery}
            placeholder=" 매장을 검색해주세요."
            onKeyPress={searchShop}
          />
          <span
            className="input-group-text flex items-center px-3 py-1.5 text-base font-normal text-gray-700 text-center whitespace-nowrap rounded"
            id="basic-addon2"
          >
            <button
              type="button"
              onClick={searchShop}
              onChange={getQuery}
              className="absolute right-0 top-0 mr-5"
            >
              <svg
                className="h-8 w-4 fill-current mt-1 text-orange-400"
                version="1.1"
                id="Capa_1"
                x="0px"
                y="0px"
                viewBox="0 0 56.966 56.966"
                width="512px"
                height="512px"
              >
                <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
              </svg>
            </button>
          </span>
          {/* </div> */}
        </div>
      </div>
      <div className="page flex justify-center ml-24 mt-4">
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
      <div>{auth.id && <WaitingStatus />}</div>
    </>
  );
}

export default PageIndex;

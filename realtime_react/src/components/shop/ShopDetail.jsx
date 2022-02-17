import { useApiAxios } from "api/base";
import { data } from "autoprefixer";
import DebugStates from "components/DebugStates";
import { useAuth } from "contexts/AuthContext";
import useFieldValues from "hook/usefieldValues";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./ShopDetail.css";
import ShopDetailComponent from "./ShopDetailComponent";
import ShopReviewComponent from "./ShopReviewComponent";

const INIT_REVIEW_FIELD_VALUES = {
  content: "",
  rating: "",
};

function ShopDetail({ shopId }) {
  const [auth] = useAuth();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const [
    { data: ShopData, loading: ShopLoading, error: ShopError },
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

  const [
    { data: ReviewData, loading: ReviewLoading, error: ReviewError },
    ReviewRefetch,
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
    ReviewRefetch();
  }, [shopId]);

  const { fieldValues, handleFieldChange } = useFieldValues(
    INIT_REVIEW_FIELD_VALUES
  );

  const [{ loading, error, errorMessages }, requestReview] = useApiAxios(
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

    console.log("저장 성공!!");
    requestReview({
      data: {
        ...fieldValues,
        user_id: auth.id,
        shop_id: ShopData.id,
      },
    }).then((response) => {
      ReviewRefetch();
      console.log("저장완료");
      const { content, rating } = response.data;
      console.log(content, rating);
    });
  };

  // get_ShopInfo
  const [
    {
      data: getShopInfoData,
      loading: getShopInfoLoading,
      error: getShopInfoError,
    },
    getShopInfoRefetch,
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
    getShopInfoRefetch();
  }, []);

  // get_review
  const [
    { data: getReviewData, loading: getReviewLoading, error: getReviewError },
    getReviewRefetch,
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
    getReviewRefetch();
  }, []);

  return (
    <div>
      {ShopData && (
        <>
          <br />
          <p className="text-4xl">{ShopData.name}</p>
          <div>
            잔여 테이블수: {ShopData.now_table_count} /{" "}
            {ShopData.total_table_count}
          </div>
          <div>
            <button
              onClick={() => {}}
              className="bg-violet-300 border border-violet-300 rounded w-2/2 my-1 mx-2 p-2"
            >
              지금예약
            </button>
            <Link
              to={`/shop/${shopId}/booking/new/`}
              className="bg-violet-300 border border-violet-300 rounded w-2/2 my-1 mx-2 p-3"
            >
              지금말고 예약
            </Link>
          </div>
          <br />

          <div className="photo_align">
            <span>매장사진</span>
            <img
              src={ShopData.photo}
              alt={ShopData.name}
              className="shopphoto rounded"
            />
          </div>
          <br />
          <br />
          <div>
            <p>공지사항</p>
            {ShopData.notice}
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

      {showInfo && getShopInfoData && (
        <div>
          <div>매장정보</div>
          <ShopDetailComponent shopinfo={getShopInfoData} />;
        </div>
      )}

      {showMenu && getReviewData && (
        <div>
          <div>리뷰내용</div>
          {getReviewData
            ?.filter(
              (review_shop) => review_shop.shop_id.id === parseInt(shopId)
            )
            .map((review) => {
              return <ShopReviewComponent review={review} />;
            })}
        </div>
      )}

      {ReviewData && (
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
            <span>{ReviewData.nickname}</span>
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
      {/* <DebugStates getShopInfoData={getShopInfoData} /> */}
      {/* <DebugStates ShopData={ShopData} /> */}
      <DebugStates ReviewData={ReviewData} />
    </div>
  );
}

export default ShopDetail;

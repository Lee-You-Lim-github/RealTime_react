import { useApiAxios } from "api/base";
import { data } from "autoprefixer";
import DebugStates from "components/DebugStates";
import { useAuth } from "contexts/AuthContext";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./ShopDetail.css";

function ShopDetail({ shopId }) {
  const [auth] = useAuth();

  const [{ data: ShopData, loading: ShopLoading, error: ShopError }, refetch] =
    useApiAxios(
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
    refetch();
  }, [shopId]);

  return (
    <div>
      {ShopData && (
        <>
          <p className="text-4xl">{ShopData.name}</p>
          <div>
            잔여 테이블수: {ShopData.now_table_count} /{" "}
            {ShopData.total_table_count}
          </div>
          <div>
            <button className="bg-violet-300 border border-violet-300 rounded w-2/2 my-1 mx-2 p-2">
              지금예약
            </button>
            <Link
              to={`/shop/${shopId}/booking/new/`}
              className="bg-violet-300 border border-violet-300 rounded w-2/2 my-1 mx-2 p-3"
            >
              지금말고 예약
            </Link>
          </div>

          <div className="photo_align">
            <span>매장사진</span>
            <img
              src={ShopData.photo}
              alt={ShopData.name}
              className="shopphoto rounded"
            />
          </div>
          <div>
            <p>공지사항</p>
            {ShopData.notice}
          </div>
          <button className="bg-violet-300 border border-violet-300 rounded w-2/2 my-1 mx-2 p-2">
            매장정보
          </button>
          <button className="bg-violet-300 border border-violet-300 rounded w-2/2 my-1 mx-2 p-2">
            리뷰보기
          </button>
          <div>리뷰내용</div>
          <div>리뷰작성</div>
        </>
      )}
      <DebugStates data={ShopData} />
    </div>
  );
}

export default ShopDetail;

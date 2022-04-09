import DebugStates from "components/DebugStates";
import ShopCarousel from "components/map/ShopCarousel";
import Star from "components/shop/ShopStar";
import { Link } from "react-router-dom";
import Timestamp from "react-timestamp";
import quotes from "assets/img/quotes.png";

function NewReviewList({ reviewData }) {
  const sortReviewData = reviewData
    .sort(
      (newShop, newShop2) =>
        new Date(newShop2.created_at) - new Date(newShop.created_at)
    )
    .slice(0, 5);

  console.log("review", reviewData);

  return (
    <div>
      <div className="mt-28 ml-64 text-xl font-bold">
        방문자가 남긴 최근 리뷰!
      </div>
      <div
        style={{
          maxWidth: 1060,
          marginLeft: "235px",
          marginRight: "auto",
          marginTop: 10,
        }}
      >
        <ShopCarousel show={3}>
          {sortReviewData.map((data, index) => (
            <div className="ml-2 py-1 mb-32">
              <Link to={`/shop/${data.book_id.shop_id.id}/`}>
                <div
                  className="border-solid border-2 m-3 w-72 h-60 rounded overflow-hidden hover:-translate-y-1"
                  style={{ padding: 8 }}
                >
                  <div className="ml-2 mt-4">
                    <img src={quotes} width="15px" height="15px" />
                  </div>
                  <div className="font-bold mb-1 ml-2 mt-4">
                    {data.book_id.shop_id.name}
                  </div>
                  <div className="ml-2 mt-3">
                    <Star score={data.rating} />
                  </div>
                  <div className="target mt-3 ml-2">{data.content}</div>
                  <div className="bottom-0 left-0 ml-40 mt-4">
                    <Timestamp relative date={data.created_at} autoUpdate />
                  </div>{" "}
                </div>
              </Link>
            </div>
          ))}
        </ShopCarousel>
      </div>
    </div>
  );
}

export default NewReviewList;

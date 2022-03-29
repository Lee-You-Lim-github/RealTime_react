import DebugStates from "components/DebugStates";
import ShopCarousel from "components/map/ShopCarousel";
import Star from "components/shop/ShopStar";
import { Link } from "react-router-dom";

function NewReviewList({ reviewData }) {
  const sortReviewData = reviewData
    .sort(
      (newShop, newShop2) =>
        new Date(newShop2.created_at) - new Date(newShop.created_at)
    )
    .slice(0, 5);

  return (
    <div
      style={{
        maxWidth: 1200,
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: 64,
      }}
    >
      <ShopCarousel show={3}>
        {sortReviewData.map((data, index) => (
          <div>
            <Link to={`/shop/${data.id}/`}>
              <div className="border-solid border-2 m-1" style={{ padding: 8 }}>
                <div>
                  <Star score={data.rating} />
                </div>
                <div>{data.content}</div>
                <div>{data.book_id?.user_id.nickname}</div>
                <div>{data.wait_id?.user_id.nickname}</div>{" "}
              </div>
            </Link>
          </div>
        ))}
      </ShopCarousel>
    </div>
  );
}

export default NewReviewList;

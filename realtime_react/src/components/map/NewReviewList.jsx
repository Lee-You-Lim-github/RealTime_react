import DebugStates from "components/DebugStates";
import ShopCarousel from "components/map/ShopCarousel";

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
            <div>
              <div style={{ padding: 8 }}>
                <div>{data.rating}</div>
                <div>{data.content}</div>
                <div>{data.book_id?.user_id.nickname}</div>
                <div>{data.wait_id?.user_id.nickname}</div>{" "}
              </div>
            </div>
          </div>
        ))}
      </ShopCarousel>
    </div>
  );
}

export default NewReviewList;

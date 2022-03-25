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
        <div>
          <div style={{ padding: 8 }}>
            <div>{sortReviewData[0].rating}</div>
            <div>{sortReviewData[0].content}</div>
            <div>{sortReviewData[0].book_id?.user_id.nickname}</div>
            <div>{sortReviewData[0].wait_id?.user_id.nickname}</div>{" "}
          </div>
        </div>
        <div>
          <div style={{ padding: 8 }}>
            <div>{sortReviewData[1].rating}</div>
            <div>{sortReviewData[1].content}</div>
            <div>{sortReviewData[1].book_id?.user_id.nickname}</div>
            <div>{sortReviewData[1].wait_id?.user_id.nickname}</div>{" "}
          </div>
        </div>
        <div>
          <div style={{ padding: 8 }}>
            <div>{sortReviewData[2].rating}</div>
            <div>{sortReviewData[2].content}</div>
            <div>{sortReviewData[2].book_id?.user_id.nickname}</div>
            <div>{sortReviewData[2].wait_id?.user_id.nickname}</div>{" "}
          </div>
        </div>
        <div>
          <div style={{ padding: 8 }}>
            <div>{sortReviewData[3].rating}</div>
            <div>{sortReviewData[3].content}</div>
            <div>{sortReviewData[3].book_id?.user_id.nickname}</div>
            <div>{sortReviewData[3].wait_id?.user_id.nickname}</div>{" "}
          </div>
        </div>
        <div>
          <div style={{ padding: 8 }}>
            <div>{sortReviewData[4].rating}</div>
            <div>{sortReviewData[4].content}</div>
            <div>{sortReviewData[4].book_id?.user_id.nickname}</div>
            <div>{sortReviewData[4].wait_id?.user_id.nickname}</div>{" "}
          </div>
        </div>
      </ShopCarousel>
    </div>
  );
}

export default NewReviewList;

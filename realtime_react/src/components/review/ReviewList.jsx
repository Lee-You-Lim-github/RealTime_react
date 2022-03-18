import { useApiAxios } from "api/base";
import DebugStates from "components/DebugStates";
import { useAuth } from "contexts/AuthContext";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import ReviewSummary from "./ReviewSummary";

function ReviewList({ userId, itemsPerPage = 5 }) {
  const [auth] = useAuth();
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState();
  const [page, setPage] = useState(0);
  const [reload, setReload] = useState(false);
  const [{ data, loading, error }, getreview] = useApiAxios(
    {
      url: `/review/api/review/?${
        page ? "page=" + (page + 1) : "page=1"
      }&user_id=${userId}`,
      method: `GET`,
    },
    { manual: true }
  );

  useEffect(() => {
    getreview()
      .then(({ data }) => {
        setPageCount(Math.ceil((data?.count ? data.count : 1) / itemsPerPage));
        setCurrentItems(data?.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [reload]);

  //페이지 클릭 이벤트
  const handlePageClick = (event) => {
    setPage(event.selected);
  };

  //페이지 넘기면 리로드
  useEffect(() => {
    setReload((prevState) => !prevState);
  }, [page]);

  return (
    <div>
      {loading && "로딩 중 ..."}
      {error && "로딩 중 에러가 발생했습니다."}
      <h1>리뷰내역</h1>
      <div>
        {currentItems?.map((review, index) => (
          <ReviewSummary
            review={review}
            key={review.id}
            index={index}
            userId={userId}
          />
        ))}
      </div>
      <ReactPaginate
        className="pagination"
        breakLabel="..."
        previousLabel="<"
        nextLabel=">"
        pageCount={pageCount}
        pageRangeDisplayed={itemsPerPage}
        onPageChange={handlePageClick}
        renderOnZeroPageCount={null}
      />
      <DebugStates currentItems={currentItems} />;
    </div>
  );
}
export default ReviewList;

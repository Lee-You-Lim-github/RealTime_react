import { useApiAxios } from "api/base";
import { useCallback, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import AdminQnaSummary from "./AdminQnaSummary";
import adminqna from "assets/img/adminqna.png";

function AdminQnaList({ itemsPerPage = 10 }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState();
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState();
  const [page, setPage] = useState(0);
  const [reload, setReload] = useState(false);
  const [Authority, setAuthority] = useState("");

  const [{ data, loading, error }, getQna] = useApiAxios(
    {
      url: `/qna/api/qna/`,
      method: "GET",
    },
    { manual: true }
  );

  useEffect(() => {
    setReload((prevState) => !prevState);
  }, [page]);

  // 리로드 값 변경 때마다 엑시오스 함수 호출
  const fetchApplications = useCallback(
    async (newPage, newQuery = query) => {
      const params = {
        page: newPage,
        query: newQuery,
        authority: Authority,
      };

      const { data } = await getQna({ params });

      setPage(newPage);
      setPageCount(Math.ceil(data.count / itemsPerPage));
      setCurrentItems(data?.results);
    },
    [Authority, query, getQna]
  );

  useEffect(() => {
    fetchApplications(1);
  }, []);

  // 페이지 클릭 이벤트

  const handlePageClick = (event) => {
    fetchApplications(event.selected + 1);
  };

  //검색

  const search = (e) => {
    if (e.key === "Enter") {
      fetchApplications(1, query);
    }
  };

  // 카테고리

  const Authoritycategory = (e) => {
    e.preventDefault();
    fetchApplications(1, query);
  };

  return (
    <div className="bg-white p-8 rounded-md w-[900px] mx-auto">
      <div className="flex items-center justify-between pb-4 md:flex">
        <div className="flex flex-row">
          <img src={adminqna} alt="adminqna" className="w-11 h-11 ml-2" />
          <h2 className="text-gray-600 px-4 py-1 mt-1 font-semibold sm:flex-1 text-3xl md:text-2xl lg:text-2xl cursor-pointer">
            1:1문의
          </h2>
        </div>

        <div className="flex items-center justify-between">
          <div className="relative text-gray-600 mr-2">
            <select
              className="border-2 border-stone-300 py-2 px-1 mr-2"
              onChange={(e) => setAuthority(e.target.value)}
              onClick={Authoritycategory}
            >
              <option value="" selected>
                전체
              </option>
              <option value="0">개인</option>
              <option value="1">사업자</option>
            </select>

            <input
              className="bg-wihte h-9 px-5 pr-10 text-sm border-b-2 border-orange-400 outline-none"
              type="search"
              name="search"
              placeholder="제목"
              onKeyPress={search}
              onChange={(e) => {
                setQuery(e.target.value);
              }}
            />
            <button
              type="button"
              onClick={search}
              onChange={(e) => {
                setQuery(e.target.value);
              }}
              className="absolute right-0 top-0 mt-2.5 mr-4 bg-gray-50"
            >
              <svg
                className="bg-white h-4 w-4 fill-current"
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
          </div>
        </div>
      </div>

      <div>
        {data && (
          <div className="-mx-4 sm:-mx-8 md:flex-1 px-24 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full overflow-hidden">
              <table className="table-auto min-w-full whitespace-no-wrap">
                <thead>
                  <tr>
                    <th className="px-3 py-3 border-b border-t border-orange-400 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      No.
                    </th>
                    <th className="px-3 py-3 border-b border-t border-orange-400 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      구분
                    </th>
                    <th className="px-3 py-3 border-b border-t border-orange-400 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      제목
                    </th>
                    <th className="px-3 py-3 border-b border-t border-orange-400 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      등록일
                    </th>
                    <th className="px-3 py-3 border-b border-t border-orange-400 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      답변여부
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {currentItems?.map((qna, index) => (
                    <AdminQnaSummary qna={qna} key={qna.id} index={index} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
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
      </div>
    </div>
  );
}

export default AdminQnaList;

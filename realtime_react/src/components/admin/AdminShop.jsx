import "../Paginations/Paginations.css";
import { useApiAxios } from "api/base";
import { useCallback, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import AdminShopComponent from "./AdminShopComponent";
import LoadingIndicator from "components/LoadingIndicator";
import myshop from "assets/img/adminshop.png";
import { useAuth } from "contexts/AuthContext";

function AdminShop({ itemsPerPage = 10 }) {
  // paging
  const [, setItem] = useState(null);
  const [pageCount, setPageCount] = useState(1);
  const [page, setPage] = useState(1);

  // search
  const [query, setQuery] = useState();

  // reload
  const [reload, setReload] = useState(false);

  const [auth] = useAuth();

  const [{ data: adminShopData, loading, error }, adminRefetch] = useApiAxios(
    {
      url: `/shop/api/shops/${query ? "?query=" + query : ""}`,
      method: "GET",
    },
    { manual: true }
  );

  const fetchApplication = useCallback(
    async (newPage, newQuery = query) => {
      const params = {
        page: newPage,
        query: newQuery,
      };

      const { data } = await adminRefetch({ params });

      setPage(newPage);

      setPageCount(Math.ceil(data.count / itemsPerPage));

      setItem(data?.results);
    },
    [query]
  );

  // get_users_refetch()
  useEffect(() => {
    fetchApplication(1);
  }, []);

  const handlePage = (event) => {
    fetchApplication(event.selected + 1);
  };

  const [{ loading: deleteLoading, error: deleteError }, deleteShop] =
    useApiAxios(
      {
        url: `/shop/api/shops/`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${auth.access}`,
        },
      },
      { manual: true }
    );

  // 등록된 매장 삭제
  const handleDelete = (e) => {
    deleteShop({
      url: `/shop/api/shops/${e}/`,
      method: "DELETE",
    })
      .then((Response) => {
        alert("삭제되었습니다.");
        fetchApplication(page);
      })
      .catch();
  };

  // 사업자번호 / 매장명으로 검색
  const search = (e) => {
    if (e.key === "Enter") {
      const { value } = e.target;
      setQuery(value);
      fetchApplication(1, query);
      setReload((prevState) => !prevState);
    }
    adminRefetch();
  };

  const getQuery = (e) => {
    const { value } = e.target;
    setQuery(value);
  };

  return (
    <div>
      <div className="bg-white p-8 rounded-md w-[900px] m-auto">
        <div className="flex items-center justify-between pb-4 md:flex">
          <div className="flex flex-row">
            <img className="w-9 h-9 ml-2" src={myshop} alt="myshop" />
            <h1
              className="text-gray-600 px-4 py-1 mt-1 font-semibold sm:flex-1 text-3xl md:text-2xl lg:text-2xl cursor-pointer"
              onClick={() => window.location.replace("/admin/shop/")}
            >
              매장관리
            </h1>
          </div>
          {error?.response?.status >= 400 && (
            <div className="text-red-400">
              데이터를 가져오는데 실패했습니다.
            </div>
          )}
          {deleteLoading && <LoadingIndicator>삭제 중...</LoadingIndicator>}
          {deleteError?.response?.status >= 400 && (
            <div className="text-red-400">삭제에 실패했습니다.</div>
          )}
          <div className="flex items-center justify-between">
            <div className="relative text-gray-600 rounded-3xl mr-2">
              <input
                type="search"
                name="serch"
                onChange={getQuery}
                onKeyPress={search}
                placeholder="사업자등록번호/매장명"
                className="bg-wihte h-9 px-5 pr-10 text-sm outline-none border-b-2 border-orange-400"
              />
              <button
                type="button"
                onClick={search}
                onChange={getQuery}
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
          {adminShopData && (
            <div className="-mx-4 sm:-mx-8 md:flex-1 px-24 sm:px-8 py-4 overflow-x-auto">
              <div className="inline-block min-w-full overflow-hidden">
                <table className="table-auto min-w-full whitespace-no-wrap">
                  <thead>
                    <tr>
                      <th className="px-5 py-3 border-b border-t border-orange-400 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        사업자등록번호
                      </th>
                      <th className="px-5 py-3 border-b border-t border-orange-400 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        매장명
                      </th>
                      <th className="px-5 py-3 border-b border-t border-orange-400 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        매장 전화번호
                      </th>
                      <th className="px-5 py-3 border-b border-t border-orange-400 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        주소
                      </th>
                      <th className="px-5 py-3 border-b border-t border-orange-400 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        매장 정보 삭제
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {adminShopData?.results?.map((admin_shop) => (
                      <AdminShopComponent
                        key={admin_shop.id}
                        admin_shop={admin_shop}
                        handleDelete={handleDelete}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
              <ReactPaginate
                breakLabel="..."
                nextLabel=">"
                onPageChange={handlePage}
                pageRangeDisplayed={itemsPerPage}
                pageCount={pageCount}
                previousLabel="<"
                renderOnZeroPageCount={null}
                className="pagination"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminShop;

import "../Paginations/Paginations.css";
import { useApiAxios } from "api/base";
import { useCallback, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import AdminShopComponent from "./AdminShopComponent";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingIndicator from "components/LoadingIndicator";

function AdminShop({ itemsPerPage = 10 }) {
  // paging
  const [, setItem] = useState(null);
  const [pageCount, setPageCount] = useState(1);
  const [, setPage] = useState(1);

  // search
  const [query, setQuery] = useState();

  // reload
  const [reload, setReload] = useState(false);

  const [{ data: adminShopData, loading, error }, adminRefetch] = useApiAxios(
    {
      url: `shop/api/shops/${query ? "?query=" + query : ""}`,
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
        console.log("삭제 성공");
        toast.info("🦄 삭제되었습니다.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setReload(true);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    adminRefetch();
  }, [reload]);

  // 사업자번호 / 매장명으로 검색
  const search = (e) => {
    if (e.key === "Enter") {
      const { value } = e.target;
      setQuery(value);
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
      <div className="bg-white p-8 rounded-md w-full">
        <div className=" flex items-center justify-between pb-6">
          <div>
            <h1 className="text-gray-600 font-semibold">매장관리</h1>
            {loading && <LoadingIndicator>로딩 중...</LoadingIndicator>}
            {deleteLoading && <LoadingIndicator>삭제 중...</LoadingIndicator>}
            {deleteError?.response?.status >= 400 && (
              <div className="text-red-400">삭제에 실패했습니다.</div>
            )}
          </div>
          <div className="flex items-center justify-between">
            <div className="flex bg-gray-50 items-center p-2 rounded-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd"
                />
              </svg>
              <input
                className="bg-gray-50 outline-none ml-1 block "
                type="search"
                placeholder="사업자등록번호/매장명"
                onChange={getQuery}
                onKeyPress={search}
              />
            </div>
          </div>
        </div>
        <div>
          {adminShopData && (
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
              <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        사업자등록번호
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        매장명
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        매장 전화번호
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        주소
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        매장 삭제
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {adminShopData?.map((admin_shop) => (
                      <AdminShopComponent
                        admin_shop={admin_shop}
                        handleDelete={handleDelete}
                      />
                    ))}
                  </tbody>
                </table>
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminShop;

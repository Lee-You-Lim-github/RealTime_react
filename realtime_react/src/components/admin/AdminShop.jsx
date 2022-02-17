import { useApiAxios } from "api/base";
import DebugStates from "components/DebugStates";
import { useAuth } from "contexts/AuthContext";
import { useEffect, useState } from "react";
import AdminShopComponent from "./AdminShopComponent";

function AdminShop() {
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

  useEffect(() => {
    adminRefetch();
  }, []);

  const [{ loading: deleteLoading, error: deleteError }, deleteShop] =
    useApiAxios(
      {
        url: `/shop/api/shops/`,
        method: "DELETE",
      },
      { manual: true }
    );

  const handleDelete = (e) => {
    console.log(e);
    // const shop_id = e.target.value;
    if (window.confirm("Are you sure?")) {
      deleteShop({
        url: `/shop/api/shops/${e}/`,
        method: "DELETE",
      });
    }
    window.location.replace(`/admin/shop/`);
  };

  useEffect(() => {
    adminRefetch();
  }, []);

  // 사업자번호 / 매장명으로 검색
  const search = (e) => {
    console.log(e.target.value);
    if (e.key === "Enter") {
      const { value } = e.target;
      setQuery(value);
      setReload((prevState) => !prevState);
    }
    adminRefetch();
  };

  const getQuery = (e) => {
    const { value } = e.target;
    console.log(value);
    setQuery(value);
  };

  return (
    <div>
      <DebugStates adminShopData={adminShopData} />

      <div class="bg-white p-8 rounded-md w-full">
        <div class=" flex items-center justify-between pb-6">
          <div>
            <h1 class="text-gray-600 font-semibold">매장관리</h1>
          </div>
          <div class="flex items-center justify-between">
            <div class="flex bg-gray-50 items-center p-2 rounded-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-gray-400"
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
                class="bg-gray-50 outline-none ml-1 block "
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
            <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
              <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
                <table class="min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        사업자등록번호
                      </th>
                      <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        매장명
                      </th>
                      <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        매장 전화번호
                      </th>
                      <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        주소
                      </th>
                      <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        매장 삭제
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ */}
                    {adminShopData?.map((admin_shop) => (
                      <AdminShopComponent
                        admin_shop={admin_shop}
                        handleDelete={handleDelete}
                      />
                    ))}
                  </tbody>
                </table>
                {/* <div class="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
                  <span class="text-xs xs:text-sm text-gray-900">
                    Showing 1 to 4 of 50 Entries  
                  </span>
                  <div class="inline-flex mt-2 xs:mt-0">
                    <button class="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-l">
                      Prev
                    </button>
                    &nbsp; &nbsp;
                    <button class="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-r">
                      Next
                    </button>
                  </div>
                </div> */}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminShop;

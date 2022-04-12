import "../Paginations/Paginations.css";
import { useApiAxios } from "api/base";
import { useAuth } from "contexts/AuthContext";
import React, { useCallback, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import AdminUserComponent from "./AdminUserComponent";
import LoadingIndicator from "components/LoadingIndicator";
import group from "assets/img/group.png";

function AdminUser({ itemsPerPage = 10 }) {
  const [auth] = useAuth();
  const [checked, setChecked] = useState(false);
  // paging
  const [, setItem] = useState(null);
  const [pageCount, setPageCount] = useState(1);
  const [, setPage] = useState(1);

  // search
  const [query, setQuery] = useState();

  // reload
  const [reload, setReload] = useState(false);

  // get_users
  const [{ data: getUserData, loading, error }, refetch] = useApiAxios(
    {
      url: `/accounts/api/users/${query ? "?query=" + query : ""}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${auth.access}`,
      },
    },
    { manual: true }
  );

  const fetchApplication = useCallback(
    async (newPage, newQuery = query) => {
      const params = {
        page: newPage,
        query: newQuery,
        black: checked ? "black" : "",
      };

      const { data } = await refetch({ params });

      setPage(newPage);
      setPageCount(Math.ceil(data.count / itemsPerPage));
      setItem(data?.results);
    },
    [query, checked]
  );

  // get_users_refetch()
  useEffect(() => {
    fetchApplication(1);
  }, [checked]);

  const handlePage = (event) => {
    fetchApplication(event.selected + 1);
  };

  // 유저ID / 유저명으로 검색
  const search = (e) => {
    if (e.key === "Enter") {
      const { value } = e.target;
      setQuery(value);
      fetchApplication(1, query);
      setReload((prevState) => !prevState);
    }
    refetch();
  };

  const getQuery = (e) => {
    const { value } = e.target;
    setQuery(value);
  };

  return (
    <div className="bg-white p-8 rounded-md w-[900px] m-auto">
      <div className="flex items-center justify-between pb-4 md:flex">
        <div className="flex flex-row">
          <img className="w-12 h-12 ml-2" src={group} alt="group" />
          <h2
            className="text-gray-800 px-4 py-1 font-semibold sm:flex-1 text-3xl md:text-2xl lg:text-2xl cursor-pointer mt-2"
            onClick={() => window.location.replace("/admin/user/")}
          >
            회원관리
          </h2>
        </div>
        {loading && <LoadingIndicator>로딩 중...</LoadingIndicator>}
        {error?.response?.status >= 400 && (
          <div className="text-red-400">데이터를 가져오는데 실패했습니다.</div>
        )}
        <div className="flex items-center justify-between">
          <div className="relative text-gray-600 mr-2">
            <input
              type="search"
              name="search"
              onChange={getQuery}
              onKeyPress={search}
              placeholder="회원ID/회원명"
              className="bg-wihte h-9 px-5 pr-10 text-sm border-b-2 border-orange-400 outline-none "
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
        {getUserData && (
          <div className="-mx-4 sm:-mx-8 md:flex-1 px-24 sm:px-8 py-4 overflow-x-auto">
            <label className="flex">
              <input
                type="checkbox"
                value={checked}
                className="form-checkbox h-5 w-5"
                onChange={(e) => {
                  setChecked(e.target.checked);
                }}
              />
              <div className="ml-2 text-gray-800">블랙리스트</div>
            </label>
            <hr className="boder-b" />

            <div className="inline-block min-w-full overflow-hidden">
              <table className="table-auto min-w-full whitespace-no-wrap">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      회원ID
                    </th>
                    <th className="px-5 py-3 border-b text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      회원명
                    </th>
                    <th className="px-5 py-3 border-b text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      닉네임
                    </th>
                    <th className="px-5 py-3 border-b text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      휴대폰번호
                    </th>
                    <th className="px-5 py-3 border-b text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      구분
                    </th>
                    <th className="px-5 py-3 border-b text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      블랙여부
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {getUserData?.results
                    ?.filter(
                      (not_superuser) => not_superuser.is_superuser === false
                    )
                    .map((user, index) => {
                      return (
                        <>
                          <AdminUserComponent key={user.id} user={user} />
                        </>
                      );
                    })}
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
  );
}

export default AdminUser;

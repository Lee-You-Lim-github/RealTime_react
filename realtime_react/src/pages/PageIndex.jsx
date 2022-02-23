import { useApiAxios } from "api/base";
import Map from "components/map/Map";
import Sidebar from "components/map/SideBar";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function PageIndex() {
  const [query, setQuery] = useState();
  const [reload, setReload] = useState(false);
  const [{ data: getData, loading, error }, refetch] = useApiAxios(
    {
      url: `/shop/api/shops/${query ? "?query=" + query : ""}`,
      method: "GET",
    },
    { manual: true }
  );

  useEffect(() => {
    refetch();
  }, []);

  const getQuery = (e) => {
    const { value } = e.target;
    setQuery(value);
  };

  const searchShop = (e) => {
    if (e.key === "Enter") {
      const { value } = e.target;
      setQuery(value);
      setReload((prevState) => !prevState);
    }
    refetch();
  };

  useEffect(() => {
    refetch().then((request) => console.log(request));
  }, [reload]);

  return (
    <>
      <div className="page">{getData && <Map getData={getData} />}</div>
      <div className="paging text-center">
        <input
          className="w-60 h-9"
          type="search"
          onChange={getQuery}
          placeholder="매장을 검색해주세요."
          onKeyPress={searchShop}
        />
      </div>

      <Sidebar width={200} />
    </>
  );
}

export default PageIndex;

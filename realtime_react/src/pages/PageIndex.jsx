import { useApiAxios } from "api/base";
import Map from "components/map/Map";
import Sidebar from "components/map/SideBar";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

function PageIndex() {
  // const { shopId } = useParams();
  const [{ data: getData, loading, error }, refetch] = useApiAxios(
    {
      url: `/shop/api/shops/`,
      method: "GET",
    },
    { manual: true }
  );

  useEffect(() => {
    refetch();
  }, []);

  return (
    <>
      {getData && <Map getData={getData} shopId={getData.shop_id} />}
      <Sidebar width={200} />
    </>
  );
}

export default PageIndex;

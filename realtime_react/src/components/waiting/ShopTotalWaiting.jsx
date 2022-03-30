import { useApiAxios } from "api/base";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

function ShopTotalWaiting() {
  const { shopId } = useParams();

  const [{ data: waits }, waitRefetch] = useApiAxios(
    {
      url: `/waiting/api/waitings/?all&shop_id=${shopId}`,
      method: "GET",
    },
    { manual: true }
  );

  useEffect(() => {
    waitRefetch();
  }, []);

  return (
    <span className="text-xl">
      {waits && waits.filter((wait) => wait.wait_visit_status === "0").length}
    </span>
  );
}

export default ShopTotalWaiting;

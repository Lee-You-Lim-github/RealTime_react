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

  const today = new Date();
  const year = today.getFullYear();
  const month = ("0" + (today.getMonth() + 1)).slice(-2);
  const day = ("0" + today.getDate()).slice(-2);

  const dateString = year + "-" + month + "-" + day;

  return (
    <span className="text-xl">
      {waits &&
        waits.filter(
          (wait) =>
            wait.wait_visit_status === "0" &&
            wait.wait_cancel === "0" &&
            wait.wait_date.slice(0, -16) === dateString
        ).length}
    </span>
  );
}

export default ShopTotalWaiting;

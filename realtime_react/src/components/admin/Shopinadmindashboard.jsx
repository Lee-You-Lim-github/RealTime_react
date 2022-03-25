import { useApiAxios } from "api/base";
import { useEffect } from "react";

function Shopinadmindashboard() {
  const [{ data: USER, loading, error }, refetch] = useApiAxios(
    {
      url: `/shop/api/shops/?all`,
      method: "GET",
    },
    { manual: true }
  );

  useEffect(() => {
    refetch();
  }, []);

  const today = new Date();
  const year = today.getFullYear();
  const month = ("0" + (today.getMonth() + 1)).slice(-2);
  const day = ("0" + today.getDate()).slice(-2);

  const dateString = year + "-" + month + "-" + day;
  return (
    <div className="mt-16">
      <div> 오늘 등록된 매장은?</div>
      <div className="text-4xl">
        {USER &&
          USER?.filter(
            (user) => user.registered_date.slice(0, 10) === dateString
          ).length}
        건
      </div>
    </div>
  );
}

export default Shopinadmindashboard;

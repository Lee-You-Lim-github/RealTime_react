import { useApiAxios } from "api/base";
import { useEffect } from "react";

function Waitinginadmindashboard() {
  const [
    { data: waiting, loading: waitloading, error: waitingerror },
    getwaiting,
  ] = useApiAxios(
    {
      url: `/waiting/api/waitings/?all`,
      method: "GET",
    },
    { manual: true }
  );

  useEffect(() => {
    getwaiting();
  }, []);

  const today = new Date();
  const year = today.getFullYear();
  const month = ("0" + (today.getMonth() + 1)).slice(-2);
  const day = ("0" + today.getDate()).slice(-2);

  const dateString = year + "-" + month + "-" + day;

  return (
    <div className="mt-16 text-gray-800">
      <div> 오늘의 대기내역은?</div>
      <div className="text-4xl">
        {waiting &&
          waiting?.filter((wait) => wait.wait_date.slice(0, 10) === dateString)
            .length}
        건
      </div>
    </div>
  );
}

export default Waitinginadmindashboard;

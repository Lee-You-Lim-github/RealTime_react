import { useApiAxios } from "api/base";
import { useEffect } from "react";

function Userinadmindashboard() {
  const [{ data: USER, loading, error }, refetch] = useApiAxios(
    {
      url: `/accounts/api/users/?all`,
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
    <div className="mt-16 text-gray-800">
      <div> 오늘 가입한 회원은?</div>
      <div className="text-4xl ">
        {USER &&
          USER?.filter((user) => user.date_joined.slice(0, 10) === dateString)
            .length}
        건
      </div>
    </div>
  );
}

export default Userinadmindashboard;

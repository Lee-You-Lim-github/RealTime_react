import { useApiAxios } from "api/base";
import DebugStates from "components/DebugStates";
import { useEffect } from "react";

function Qnainadmindashboard() {
  const [{ data: QNA, loading, error }, refetch] = useApiAxios(
    {
      url: `/qna/api/qna/?all`,
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
    <div className="text-gray-800">
      <div className="mt-16 justify-center">
        <div> 개인/사업자</div>

        <div className="text-4xl ">
          <>
            {QNA &&
              QNA?.filter(
                (qna) =>
                  qna.user_id.authority === "0" &&
                  qna.registered_date === dateString
              ).length}
            /
          </>

          <>
            {QNA &&
              QNA?.filter(
                (qna) =>
                  qna.user_id.authority === "1" &&
                  qna.registered_date === dateString
              ).length}
          </>
        </div>
      </div>
    </div>
  );
}

export default Qnainadmindashboard;

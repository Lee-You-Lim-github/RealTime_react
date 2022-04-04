import { useApiAxios } from "api/base";
import DebugStates from "components/DebugStates";
import { useAuth } from "contexts/AuthContext";
import { useEffect } from "react";

function WaitingStatus() {
  const [auth] = useAuth();
  const [{ data: waitData }, waitRefetch] = useApiAxios(
    {
      url: `/waiting/api/waitings/?user_id=${auth.id}&all`,
      method: "GET",
    },
    { manual: true }
  );

  useEffect(() => {
    waitRefetch();
  }, []);

  //   useEffect(() => {
  //     userRefetch();
  //   }, []);

  const waitDataFilter = waitData?.map((data) => {
    return data;
  });

  console.log("waitDataFilter", waitDataFilter);

  //   console.log("db", db);

  return (
    <div>
      <DebugStates waitData={waitData} />
      {waitDataFilter
        ?.filter((a) => a.wait_visit_status === "0")
        ?.map((data) => data.wait_count)}
      번째
    </div>
  );
}

export default WaitingStatus;

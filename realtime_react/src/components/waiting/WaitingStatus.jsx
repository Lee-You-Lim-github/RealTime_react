import { useApiAxios } from "api/base";
import { data } from "autoprefixer";
import DebugStates from "components/DebugStates";
import WaitingVisitConfirm from "components/modal/WaitingVisitConfirm";
import { useAuth } from "contexts/AuthContext";
import { useEffect, useState } from "react";

function WaitingStatus() {
  const [auth] = useAuth();
  const [num, setNum] = useState(0);
  const [{ data: waitData }, waitRefetch] = useApiAxios(
    {
      url: `/waiting/api/waitings/?user_id=${auth.id}&all`,
      method: "GET",
    },
    { manual: true }
  );

  const [{ data: waitAllData }, waitAllRefetch] = useApiAxios(
    {
      url: `/waiting/api/waitings/?all`,
      method: "GET",
    },
    { manual: true }
  );

  useEffect(() => {
    waitRefetch();
    waitAllRefetch();
  }, []);

  const waitDataFilter = waitData && {
    count: waitData[0]?.wait_count,
    shop_id: waitData[0]?.shop_id.id,
    cancel: waitData[0]?.wait_cancel,
    status: waitData[0]?.wait_visit_status,
    user_id: waitData[0]?.user_id.id,
  };

  const waitAllDataFilter = waitAllData?.map((data) => {
    return {
      count: data.wait_count,
      shop_id: data.shop_id.id,
      cancel: data.wait_cancel,
      status: data.wait_visit_status,
    };
  });

  const compare = waitAllDataFilter
    ?.filter((a) => a.shop_id === waitDataFilter?.shop_id)
    ?.filter((p) => p.cancel === "0" && p.status === "0")
    ?.map((data) => {
      return data.count;
    });

  useEffect(() => {
    for (var i = 0; i <= compare?.length; i++) {
      if (compare[i] <= waitDataFilter?.count) {
        setNum((prev) => prev + 1);
      }
    }
  }, [waitData, waitAllData]);

  console.log(waitDataFilter?.user_id);

  return (
    <>
      {auth.id === waitDataFilter?.user_id && waitDataFilter?.status === "0" && (
        <div className="wait">
          <div className="text-xs mt-3">대기순번</div>
          <div className="">{num}</div>
        </div>
      )}
    </>
  );
}

export default WaitingStatus;

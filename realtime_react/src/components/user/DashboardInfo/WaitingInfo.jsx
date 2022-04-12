import { useApiAxios } from "api/base";
import { useAuth } from "contexts/AuthContext";
import { useEffect } from "react";

function WaitingInfo() {
  const [auth] = useAuth();

  const [{ data: userWaits }, userRefetch] = useApiAxios(
    {
      url: `/waiting/api/waitings/?all&user_id=${auth.id}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${auth.access}`,
      },
    },
    { manual: true }
  );

  useEffect(() => {
    userRefetch();
  }, []);

  const today = new Date();
  const year = today.getFullYear();
  const month = ("0" + (today.getMonth() + 1)).slice(-2);
  const day = ("0" + today.getDate()).slice(-2);

  const dateString = year + "-" + month + "-" + day;

  return (
    <span>
      {userWaits?.filter(
        (userWait) =>
          userWait.wait_visit_status === "0" &&
          userWait.wait_cancel === "0" &&
          userWait.wait_date.slice(0, -16) === dateString
      ).length > 0
        ? userWaits
            .filter(
              (userWait) =>
                userWait.wait_visit_status === "0" &&
                userWait.wait_cancel === "0" &&
                userWait.wait_date.slice(0, -16) === dateString
            )
            .map((userWait) => userWait.wait_count)
        : 0}
    </span>
  );
}

export default WaitingInfo;

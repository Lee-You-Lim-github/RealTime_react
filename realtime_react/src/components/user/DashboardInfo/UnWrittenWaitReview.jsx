import { useApiAxios } from "api/base";
import { useAuth } from "contexts/AuthContext";
import { useEffect } from "react";

function UnWrittenWaitReview() {
  const [auth] = useAuth();

  const [{ data: waitings }, refetch] = useApiAxios(
    {
      url: `/waiting/api/waitings/?all&user_id=${auth.id}&wait_visit_status=1`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${auth.access}`,
      },
    },
    { manual: true }
  );

  useEffect(() => {
    refetch();
  }, []);

  return (
    <span>
      {waitings &&
        waitings.filter((wait_obj) => wait_obj.review_set.length === 0).length}
    </span>
  );
}

export default UnWrittenWaitReview;

import { useApiAxios } from "api/base";
import { useAuth } from "contexts/AuthContext";
import { useEffect } from "react";

function ReviewInfo() {
  const [auth] = useAuth();
  const [{ data: reviews }, refetch] = useApiAxios(
    {
      url: `/review/api/review/?all&user_id=${auth.id}`,
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

  return <span>{reviews && reviews.length}</span>;
}

export default ReviewInfo;

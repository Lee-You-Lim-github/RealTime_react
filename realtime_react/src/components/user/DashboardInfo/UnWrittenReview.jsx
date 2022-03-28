import { useApiAxios } from "api/base";
import DebugStates from "components/DebugStates";
import { useAuth } from "contexts/AuthContext";
import { useEffect, useState } from "react";

function UnWrittenReview() {
  const [auth] = useAuth();
  const [books, setBooks] = useState();

  const [{ data: bookings }, refetch] = useApiAxios(
    {
      url: `/booking/api/bookings/?all&user_id=${auth.id}&visit_status=1`,
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
      {bookings &&
        bookings.filter((book_obj) => book_obj.review_set.length === 0).length}
    </span>
  );
}

export default UnWrittenReview;

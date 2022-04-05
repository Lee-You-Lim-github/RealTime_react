import { useApiAxios } from "api/base";
import { useAuth } from "contexts/AuthContext";
import { useEffect } from "react";

function Qnainshopdashboard() {
  const [auth] = useAuth();
  const [{ data: qnas }, refetch] = useApiAxios(
    {
      url: `/qna/api/qna/?all&user_id=${auth.id}`,
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
    <div>
      <div className="mt-10">나의 1:1문의</div>
      <div className="mt-3 text-2xl">{qnas && qnas.length}건</div>
    </div>
  );
}
export default Qnainshopdashboard;

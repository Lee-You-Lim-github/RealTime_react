import { useApiAxios } from "api/base";
import { useAuth } from "contexts/AuthContext";
import { useEffect } from "react";

function QnAInfo() {
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

  return <span>{qnas && qnas.length}</span>;
}

export default QnAInfo;

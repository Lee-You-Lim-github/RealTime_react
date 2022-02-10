import { useApiAxios } from "api/base";
import DebugStates from "components/DebugStates";
import { useAuth } from "contexts/AuthContext";
import { useEffect } from "react";

function UserInfo({ userId }) {
  const [auth] = useAuth();
  const [{ data, loading, error }] = useApiAxios(
    {
      url: `/accounts/api/users/${userId}/`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${auth.access}`,
      },
    },
    { manual: true }
  );

  // useEffect(() => {
  // refetch();
  // }, []);

  return (
    <>
      <h3>마이페이지</h3>
      <p>{data.user_id}</p>
      <p>{data.username}</p>
      <p>{data.nickname}</p>
      <p>{data.telephone}</p>
      <DebugStates loading={loading} error={error} />
    </>
  );
}

export default UserInfo;

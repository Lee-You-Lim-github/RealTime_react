import { useApiAxios } from "api/base";
import DebugStates from "components/DebugStates";
import { useAuth } from "contexts/AuthContext";
import { useEffect } from "react";

function UserInfo({ userId }) {
  const [auth] = useAuth();

  const [{ data: userData, loading, error }, refetch] = useApiAxios(
    {
      url: `/accounts/api/users/${userId}/`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${auth.access}`,
      },
    },
    { manual: true }
  );

  useEffect(() => {
    refetch();
  }, [userId]);

  return (
    <div>
      {userData && (
        <>
          <h3>마이페이지</h3>
          <p>{userData.user_id}</p>
          <p>{userData.username}</p>
          <p>{userData.nickname}</p>
          <p>{userData.telephone}</p>
        </>
      )}
      <DebugStates loading={loading} error={error} />
    </div>
  );
}

export default UserInfo;

import { useApiAxios } from "api/base";
import DebugStates from "components/DebugStates";
import { useAuth } from "contexts/AuthContext";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function UserInfo({ userId }) {
  const [auth] = useAuth();

  const [{ data: userData, loading, error }, refetch] = useApiAxios(
    {
      url: `/accounts/api/users/${auth.id}/`,
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
          <div className="flex flex-wrap my-3">
            <h3 className="bg-violet-300 w-1/4 text-left rounded-sm p-3">
              마이페이지
            </h3>
            <div className="border border-violet-300 w-3/5 rounded-sm p-3">
              <p className="text-left">ID : {userData.user_id}</p>
              <p className="text-left">이름 : {userData.username}</p>
              <p className="text-left">닉네임 : {userData.nickname}</p>
              <p className="text-left flex">
                휴대전화번호 : {userData.telephone}
              </p>
              <Link
                to="/mypage/:userId/edit/"
                className="bg-violet-300 hover:bg-violet-200 text-sm text-right rounded p-1"
              >
                수정
              </Link>
            </div>
          </div>
        </>
      )}
      <DebugStates loading={loading} error={error} />
    </div>
  );
}

export default UserInfo;

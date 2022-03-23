import { useApiAxios } from "api/base";
import { useAuth } from "contexts/AuthContext";
import React, { useEffect } from "react";
import "./UserInfo.css";

function UserInfo() {
  const [auth] = useAuth();

  const [, refetch] = useApiAxios(
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
  }, []);

  return (
    <div className="ml-3">
      <p className="text-left">ID : {auth.user_id}</p>
      <p className="text-left">이름 : {auth.username}</p>
      <p className="text-left">닉네임 : {auth.nickname}</p>
      <p className="text-left">휴대전화번호 : {auth.telephone}</p>
      <p className="text-left">노쇼횟수 : </p>
    </div>
  );
}

export default UserInfo;

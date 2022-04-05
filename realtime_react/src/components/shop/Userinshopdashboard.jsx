import { useApiAxios } from "api/base";
import { useAuth } from "contexts/AuthContext";
import React, { useEffect } from "react";

function Userinshopdashboard() {
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
    <div className="ml-24 mt-10">
      <p className="text-left">ID : {auth.user_id}</p>
      <p className="text-left">이름 : {auth.username}</p>
      <p className="text-left">닉네임 : {auth.nickname}</p>
      <p className="text-left">전화번호 : {auth.telephone}</p>
    </div>
  );
}

export default Userinshopdashboard;

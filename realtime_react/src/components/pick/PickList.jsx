import { useApiAxios } from "api/base";
import { useAuth } from "contexts/AuthContext";
import { useEffect, useState } from "react";
import PickComponent from "./PickComponent";

function PickList() {
  const [auth] = useAuth();
  const [pickArray, setPickArray] = useState([]);

  const [{ data: pickData }, refetch] = useApiAxios(
    {
      url: "/user/api/picks/",
      method: "GET",
      headers: {
        Authorization: `Bearer ${auth.access}`,
      },
    },
    { manual: true }
  );

  useEffect(() => {
    const userPick = pickData?.filter(
      (pick) => parseInt(auth.id) === pick.user_id.id
    );
    if (userPick !== undefined) {
      setPickArray(userPick);
    }
  }, [pickData, auth.id]);

  useEffect(() => {
    refetch().then();
  }, []);

  return (
    <>
      <div>위시리스트</div>
      {pickArray?.map((pick_obj) => (
        <PickComponent pick_obj={pick_obj} />
      ))}
    </>
  );
}

export default PickList;

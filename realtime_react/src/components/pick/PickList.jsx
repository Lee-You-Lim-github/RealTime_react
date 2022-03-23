import { useApiAxios } from "api/base";
import { useAuth } from "contexts/AuthContext";
import { useEffect, useState } from "react";
import PickComponent from "./PickComponent";
import ShowMore from "react-show-more-list";

function PickList() {
  const [auth] = useAuth();
  const [pickArray, setPickArray] = useState([]);

  const [{ data: pickData }, refetch] = useApiAxios(
    {
      url: `/user/api/picks/?user_id=${auth.id}`,
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
      <ShowMore items={pickArray} by={4}>
        {({ current, onMore }) => (
          <div>
            <div>위시리스트</div>
            {current?.map((pick_obj) => (
              <PickComponent key={pick_obj.id} pick_obj={pick_obj} />
            ))}
            <button
              disabled={!onMore}
              onClick={() => {
                if (!!onMore) onMore();
              }}
              className="text-lg border-2 border-stone-300 p-2"
            >
              더보기
            </button>
          </div>
        )}
      </ShowMore>
    </>
  );
}

export default PickList;

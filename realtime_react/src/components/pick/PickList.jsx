import { useApiAxios } from "api/base";
import { useAuth } from "contexts/AuthContext";
import { useEffect, useState } from "react";
import PickComponent from "./PickComponent";
import ShowMore from "react-show-more-list";
import picklist from "assets/img/picklist.png";

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

  const scrollUp = () => {
    window.scrollTo(0, 0);
  };

  return (
    <>
      <div className="flex flex-row my-10">
        <img src={picklist} alt="picklist" className="w-10 h-10 ml-7" />
        <h2 className="text-left text-2xl ml-2 mt-1">위시리스트</h2>
      </div>
      <ShowMore items={pickArray} by={4}>
        {({ current, onMore }) => (
          <div>
            {pickArray.length > 0 ? (
              <div className="grid grid-cols-2">
                {current?.map((pick_obj) => (
                  <PickComponent key={pick_obj.id} pick_obj={pick_obj} />
                ))}
              </div>
            ) : (
              "찜 내역이 없습니다."
            )}

            {onMore ? (
              <button
                disabled={!onMore}
                onClick={() => {
                  if (!!onMore) onMore();
                }}
                className="text-lg border-2 border-stone-300 px-1 my-5"
              >
                SHOW MORE
              </button>
            ) : (
              <button
                onClick={scrollUp}
                className="text-lg border-2 border-stone-300 px-1 my-5"
              >
                TOP
              </button>
            )}
          </div>
        )}
      </ShowMore>
    </>
  );
}

export default PickList;

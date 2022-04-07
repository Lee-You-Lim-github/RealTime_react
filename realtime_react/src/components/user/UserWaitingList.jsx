import { useApiAxios } from "api/base";
import { useAuth } from "contexts/AuthContext";
import { useEffect, useState } from "react";
import ShowMore from "react-show-more-list";
import waitinglist from "assets/img/waitinglist.png";
import UserWaitingComponent from "./UserWaitingComponent";

function UserWaiting() {
  const [auth] = useAuth();

  const [waitingArray, setWaitingArray] = useState([]);

  const [{ data: waits }, refetch] = useApiAxios(
    {
      url: `/waiting/api/waitings/?all`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${auth.access}`,
      },
    },
    { manual: true }
  );

  useEffect(() => {
    const userwating = waits?.filter(
      (waiting) => parseInt(auth.id) === waiting.user_id.id
    );

    if (userwating !== undefined) {
      setWaitingArray(userwating);
    }
  }, [waits, auth.id]);

  useEffect(() => {
    refetch().then();
  }, []);

  const scrollUp = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="w-full mx-auto mb-20">
      <div className="flex flex-row my-10">
        <img src={waitinglist} alt="waitinglist" className="w-9 h-9 ml-7" />
        <h2 className="text-left text-2xl ml-2">대기내역</h2>
      </div>

      <ShowMore items={waitingArray} by={3}>
        {({ current, onMore }) => (
          <>
            {waitingArray.length > 0 ? (
              <div className="grid grid-cols-3">
                {current?.map((wait_obj) => (
                  <UserWaitingComponent key={wait_obj.id} wait_obj={wait_obj} />
                ))}
              </div>
            ) : (
              "대기 내역이 없습니다."
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
          </>
        )}
      </ShowMore>
    </div>
  );
}

export default UserWaiting;

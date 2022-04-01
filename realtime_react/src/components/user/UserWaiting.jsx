import { useApiAxios } from "api/base";
import { useAuth } from "contexts/AuthContext";
import { useEffect, useState } from "react";
import ShowMore from "react-show-more-list";
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
    <div>
      <h2>대기내역</h2>
      <ShowMore items={waitingArray} by={3}>
        {({ current, onMore }) => (
          <>
            {waitingArray.length > 0 ? (
              <>
                {current?.map((wait_obj) => (
                  <UserWaitingComponent key={wait_obj.id} wait_obj={wait_obj} />
                ))}
              </>
            ) : (
              "대기 내역이 없습니다."
            )}

            {onMore ? (
              <button
                disabled={!onMore}
                onClick={() => {
                  if (!!onMore) onMore();
                }}
                className="text-lg border-2 border-stone-300 p-2 mb-2"
              >
                SHOW MORE
              </button>
            ) : (
              <button
                onClick={scrollUp}
                className="text-lg border-2 border-stone-300 p-2 mb-2"
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

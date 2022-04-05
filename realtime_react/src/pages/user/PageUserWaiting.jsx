import UserWaitingList from "components/user/UserWaitingList";
import { useState } from "react";
import { useParams } from "react-router-dom";
import PageUserSidebar from "./PageUserSidebar";

function PageUserWaiting() {
  const { userId } = useParams();
  const [xPosition, setX] = useState(0);

  return (
    <div
      className="grid grid-cols-8"
      style={{
        transform: `translatex(${xPosition}px)`,
      }}
    >
      <div className="grid col-span-2">
        <PageUserSidebar />
      </div>
      <div className="grid col-span-5 auto-rows-max">
        <UserWaitingList userId={userId} />
      </div>
    </div>
  );
}

export default PageUserWaiting;

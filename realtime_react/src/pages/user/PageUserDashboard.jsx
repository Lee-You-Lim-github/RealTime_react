import UserDashboard from "components/user/UserDashboard";
import UserSidebar from "components/user/UserSidebar";
import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

function PageUserDashboard() {
  const { userId } = useParams();
  const [openSidebar, setOpenSidebar] = useState(false);
  const [xPosition, setX] = useState(0);
  const side = useRef();

  const handleOpen = () => {
    if (xPosition < 0) {
      setX(0);
      setOpenSidebar(true);
    } else {
      setX(-220);
      setOpenSidebar(false);
    }
  };

  const handleClose = async (e) => {
    let sideArea = side.current;
    let sideCildren = side.current.contains(e.target);
    if (openSidebar && (!sideArea || !sideCildren)) {
      await setX(-220);
      await setOpenSidebar(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleClose);
    return () => {
      window.removeEventListener("click", handleClose);
    };
  });

  return (
    <div className="flex">
      <div className="w-1/6 h-full">
        <div
          ref={side}
          className="flex flex-row"
          style={{
            transform: `translatex(${xPosition}px)`,
          }}
        >
          <div className="w-5/6">
            <UserSidebar userId={userId} />
          </div>
          <div className="w-1/6">
            <button onClick={() => handleOpen()}>
              {openSidebar ? <span>X</span> : <span>=</span>}
            </button>
          </div>
        </div>
      </div>
      <div className="w-5/6">
        <UserDashboard userId={userId} />
      </div>
    </div>
  );
}

export default PageUserDashboard;

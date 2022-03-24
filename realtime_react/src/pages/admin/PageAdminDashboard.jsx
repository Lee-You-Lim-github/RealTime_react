import AdminDashboard from "components/admin/AdminDashboard";
import Adminsidebar from "components/admin/Adminsidebar";
import { useEffect, useRef, useState } from "react";
import ReactStickyBox from "react-sticky-box";

function PageAdminDashboard() {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [xPosition, setX] = useState(0);
  const side = useRef();

  const handleOpen = () => {
    if (xPosition < 0) {
      setX(0);
      setOpenSidebar(true);
    } else {
      setX(-200);
      setOpenSidebar(false);
    }
  };

  const handleClose = async (e) => {
    let sideArea = side.current;
    let sideCildren = side.current.contains(e.target);
    if (openSidebar && (!sideArea || !sideCildren)) {
      await setX(-200);
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
    <div
      className="grid grid-cols-8"
      style={{ transform: `translatex(${xPosition}px)` }}
    >
      <div
        className="bg-orange-400 grid col-span-1 "
        ref={side}
        style={{ transform: `translatex(${xPosition}px)` }}
      >
        <div>
          <ReactStickyBox offsetTop={220} offsetBottom={20}>
            <Adminsidebar />
          </ReactStickyBox>
        </div>
      </div>
      <div className="w-1/3 text-xl">
        <ReactStickyBox ReactStickyBox offsetTop={120} offsetBottom={20}>
          <button onClick={() => handleOpen()}>
            {openSidebar ? <span>😍</span> : <span>😎</span>}
          </button>
        </ReactStickyBox>
      </div>

      <div className="grid col-span-6 auto-rows-max">
        <AdminDashboard />
      </div>
    </div>
  );
}

export default PageAdminDashboard;

import AdminDashboard from "components/admin/AdminDashboard";
import Adminsidebar from "components/admin/Adminsidebar";
import { useEffect, useRef, useState } from "react";
import ReactStickyBox from "react-sticky-box";
import adminlist from "assets/img/adminlist.png";
import adminlist2 from "assets/img/adminlist2.png";

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
        className="bg-stone-400 grid col-span-1 "
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
            {openSidebar ? (
              <span>
                <img className="w-8 h-8" src={adminlist2} alt="adminlist2" />
              </span>
            ) : (
              <span>
                <img className="w-9 h-9" src={adminlist} alt="adminlist" />
              </span>
            )}
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

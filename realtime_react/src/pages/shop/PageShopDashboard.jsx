import Shopdashboard from "components/shop/Shopdashboard";
import ShopSidebar from "components/shop/ShopSidebar";
import { useEffect, useRef, useState } from "react";
import ReactStickyBox from "react-sticky-box";
import { useParams } from "react-router-dom";
import list from "assets/img/adminlist.png";
import list2 from "assets/img/adminlist2.png";
import { useApiAxios } from "api/base";
import { useAuth } from "contexts/AuthContext";
import PageNotShopUser from "pages/notfound/PageNotShopUser";

function PageShopDashboard(props) {
  const { shopId } = useParams();
  const [openSidebar, setOpenSidebar] = useState(false);
  const [xPosition, setX] = useState(0);
  const side = useRef();
  const [auth] = useAuth();

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

  const [{ data }, refatch] = useApiAxios(
    {
      url: `/accounts/api/users/${auth.id}/`,
      method: "GET",
    },
    { manual: true }
  );

  useEffect(() => {
    refatch();
  }, []);

  return (
    <>
      {data?.shop_set[0] ? (
        <>
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
                  <ShopSidebar shopId={shopId} />
                </ReactStickyBox>
              </div>
            </div>
            <div className="w-1/3 text-xl">
              <ReactStickyBox ReactStickyBox offsetTop={120} offsetBottom={20}>
                <button onClick={() => handleOpen()}>
                  {openSidebar ? (
                    <span>
                      <img className="w-8 h-8" src={list2} alt="list2" />
                    </span>
                  ) : (
                    <span>
                      <img className="w-9 h-9" src={list} alt="list" />
                    </span>
                  )}
                </button>
              </ReactStickyBox>
            </div>

            <div className="grid col-span-6 auto-rows-max">
              <Shopdashboard shopId={shopId} />
            </div>
          </div>
        </>
      ) : (
        <PageNotShopUser />
      )}
    </>
  );
}

export default PageShopDashboard;

import Map from "components/map/Map";
import Sidebar from "components/map/SideBar";
import React from "react";

function PageIndex() {
  return (
    <>
      <Map />
      <Sidebar width={200} />
    </>
  );
}

export default PageIndex;

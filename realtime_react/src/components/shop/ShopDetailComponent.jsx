import React from "react";
import empty from "assets/img/empty.png";
import full from "assets/img/full.png";

function ShopDetailComponent({ shopinfo }) {
  const {
    intro,
    telephone,
    address,
    opening_hours,
    conv_pack,
    conv_parking,
    conv_pet,
    conv_wifi,
  } = shopinfo;

  return (
    <React.Fragment>
      <div>{intro}</div>
      <div className="flex flex-nowrap place-content-center">
        <div className="text-left mx-5">
          <p>전화번호</p>
          <p>매장주소</p>
          <p>영업시간</p>
        </div>
        <div className="text-left">
          <p>{telephone}</p>
          <p>{address}</p>
          <p>{opening_hours}</p>
        </div>
      </div>

      <div>
        <span className="mx-1">주차장{conv_parking ? "👌" : "❌"}</span>
        <span className="mx-1">반려동물동반{conv_pet ? "👌" : "❌"}</span>
        <span className="mx-1">와이파이{conv_wifi ? "👌" : "❌"}</span>
        <span className="mx-1">포장{conv_pack ? "👌" : "❌"}</span>
      </div>
    </React.Fragment>
  );
}

export default ShopDetailComponent;

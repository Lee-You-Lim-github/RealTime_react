import React from "react";

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
      <div>전화번호: {telephone}</div>
      <div>매장주소: {address}</div>
      <div>영업시간: {opening_hours}</div>
      <div>
        <span className="mx-1">주차장{conv_parking ? "O" : "X"}</span>
        <span className="mx-1">반려동물동반{conv_pet ? "O" : "X"}</span>
        <span className="mx-1">와이파이{conv_wifi ? "O" : "X"}</span>
        <span className="mx-1">포장{conv_pack ? "O" : "X"}</span>
      </div>
    </React.Fragment>
  );
}

export default ShopDetailComponent;

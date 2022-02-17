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
      <div>{telephone}</div>
      <div>{address}</div>
      <div>{opening_hours}</div>
      <div>
        <label>주차장</label>
        <input type="checkbox" checked={conv_parking} />
        <label>애견동반</label>
        <input type="checkbox" checked={conv_pet} />
        <label>와이파이</label>
        <input type="checkbox" checked={conv_wifi} />
        <label>포장</label>
        <input type="checkbox" checked={conv_pack} />
      </div>
    </React.Fragment>
  );
}

export default ShopDetailComponent;

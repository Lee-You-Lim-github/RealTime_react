import React from "react";

function ShopInfoComponent({ shopinfo }) {
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
      <div>{(conv_pack, conv_parking, conv_pet, conv_wifi)}</div>
    </React.Fragment>
  );
}

export default ShopInfoComponent;

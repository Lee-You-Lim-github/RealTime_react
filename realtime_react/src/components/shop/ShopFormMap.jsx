import React, { useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

function ShopFormMap({ setFieldValues }) {
  const [position, setPosition] = useState({
    lat: 36.337490378182764,
    lng: 127.44915430991462,
  });

  const clicked_position = (_t, mouseEvent) => {
    setPosition({
      lat: mouseEvent.latLng.getLat(),
      lng: mouseEvent.latLng.getLng(),
    });
    setFieldValues((prev) => {
      return { ...prev, lat: position.lat, longitude: position.lng };
    });
  };

  return (
    <div>
      <Map // 지도를 표시할 Container
        center={{
          // 지도의 중심좌표
          lat: 36.337490378182764,
          lng: 127.44915430991462,
        }}
        style={{
          width: "100%",
          height: "450px",
        }}
        level={3} // 지도의 확대 레벨
        onClick={(_t, mouseEvent) => clicked_position(_t, mouseEvent)}
      >
        {position && <MapMarker position={position} />}
      </Map>
      {position && (
        <p>
          {"클릭한 위치의 위도는 " +
            position.lat +
            " 이고, 경도는 " +
            position.lng +
            " 입니다"}
        </p>
      )}
    </div>
  );
}

export default ShopFormMap;

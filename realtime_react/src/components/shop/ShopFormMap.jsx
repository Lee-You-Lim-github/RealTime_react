import React, { useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

function ShopFormMap({ getShopData, setFieldValues }) {
  const [position, setPosition] = useState(
    getShopData
      ? {
          lat: 36.337490378182764,
          lng: 127.44915430991462,
        }
      : { lat: getShopData.lat, lng: getShopData.longitude }
  );
  const [address, setAddress] = useState("");
  const [address1, setAddress1] = useState("");
  //   setFieldValues({ lat: position.lat });
  //   setFieldValues({ longitude: position.lng });
  //   console.log(position);

  //   if (position) {
  //     console.log(position.lat);
  //     // return setFieldValues({ lat: position.lat });
  //   } else {
  //     console.log("빽");
  //   }
  //   //   console.log(fieldValues);

  //   let lat = 36.337490378182764;
  //   let lng = 127.44915430991462;

  const clicked_position = (_t, mouseEvent) => {
    setPosition({
      lat: mouseEvent.latLng.getLat(),
      lng: mouseEvent.latLng.getLng(),
    });
    setFieldValues((prev) => {
      return { ...prev, lat: position.lat, longitude: position.lng };
    });

    // 위도, 경도를 받으면 주소(주소, 도로명)로 변경
    const getAddr = (lat, lng) => {
      let geocoder = new window.kakao.maps.services.Geocoder();

      let coord = new window.kakao.maps.LatLng(lat, lng);

      let callback = function (result, status) {
        console.log(status);
        if (status === window.kakao.maps.services.Status.OK) {
          console.log("주소 :", result);
          setAddress(result[0].road_address.address_name);
          setAddress1(result[0].address.address_name);
        }
      };

      geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
    };
    getAddr(position.lat, position.lng);
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
          {/* {"클릭한 위치의 위도는 " +
            position.lat +
            " 이고, 경도는 " +
            position.lng +
            " 입니다"} */}
          {`클릭한 위치는 ${address}입니다.`}
          {`클릭한 위치는 ${address1}입니다.`}
        </p>
      )}
    </div>
  );
}

export default ShopFormMap;

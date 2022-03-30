import React, { useCallback, useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

function ShopFormMap({ getShopData, setFieldValues, refetch, shopId }) {
  // 위치(위,경도)
  const [position, setPosition] = useState({});

  useEffect(() => {
    if (shopId) refetch();
    else {
    }
  }, []);

  useEffect(() => {
    setPosition(
      getShopData
        ? { lat: getShopData.lat, lng: getShopData.longitude }
        : {
            lat: 36.337490378182764,
            lng: 127.44915430991462,
          }
    );
  }, [getShopData]);

  // 도로명 주소
  const [roadAddress, setRoadAddress] = useState("");

  // 주소
  const [address, setAddress] = useState("");

  const handleGeocode = useCallback((result, status) => {
    if (status === window.kakao.maps.services.Status.OK) {
      const road_address = result[0].road_address?.address_name || "";
      const address = result[0].address?.address_name || "";
      console.log("결과 :", result);
      console.log("도로명 주소:", road_address);
      console.log("지번 주소:", address);
      setRoadAddress(road_address);
      setAddress(address);
    }
  }, []);

  useEffect(() => {
    setFieldValues((prev) => {
      return { ...prev, lat: position.lat, longitude: position.lng };
    });

    // 위도, 경도를 받으면 주소(주소, 도로명)로 변경
    const geocoder = new window.kakao.maps.services.Geocoder();
    geocoder.coord2Address(position.lng, position.lat, handleGeocode);
  }, [position, setFieldValues, handleGeocode]);

  const handleMapClick = useCallback((map, mouseEvent) => {
    setPosition({
      lat: mouseEvent.latLng.getLat(),
      lng: mouseEvent.latLng.getLng(),
    });
  }, []);

  return (
    <div>
      <Map // 지도를 표시할 Container
        center={
          getShopData
            ? { lat: getShopData.lat, lng: getShopData.longitude }
            : {
                lat: 36.337490378182764,
                lng: 127.44915430991462,
              }
        }
        style={{
          width: "100%",
          height: "450px",
        }}
        level={3} // 지도의 확대 레벨
        onClick={handleMapClick}
      >
        {position && <MapMarker position={position} />}
      </Map>
      {position && (
        <>
          <p>{`클릭한 도로명 주소는 ${roadAddress}입니다.`}</p>
          <p>{`클릭한 주소는 ${address}입니다.`}</p>
        </>
      )}
    </div>
  );
}

export default ShopFormMap;

import DebugStates from "components/DebugStates";
import { useEffect, useState } from "react";
import { Map, MapMarker, CustomOverlayMap } from "react-kakao-maps-sdk";
import marker1 from "assets/img/marker1.png";
import marker2 from "assets/img/marker2.png";
import marker3 from "assets/img/marker3.png";
import marker4 from "assets/img/marker4.png";
import marker5 from "assets/img/marker5.png";
import { Link } from "react-router-dom";
import "./Map.css";

function TypeMap({ getData }) {
  const [isOpen, setIsOpen] = useState(false);
  const [overlay, setOverlay] = useState();
  const [closeMarker, setCloseMarker] = useState(false);

  //   const markerPosition = {
  //     lat: 33.450701,
  //     lng: 126.570667,
  //   };

  const markerImageSrc =
    "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/places_category.png";

  const imageSize = { width: 27, height: 26 };
  const spriteSize = { width: 72, height: 208 };

  const koreaOrigin = { x: 10, y: 0 };
  const chinaOrigin = { x: 10, y: 36 };
  const japanOrigin = { x: 10, y: 72 };
  const westernOrigin = { x: 10, y: 108 };
  const cafeOrigin = { x: 10, y: 144 };

  const event = (name) => {
    setIsOpen(true);
    setOverlay(name);
  };

  const closeEvent = (category) => {
    setCloseMarker(false);
    setSelectedCategory(category);
  };

  const [selectedCategory, setSelectedCategory] = useState();

  useEffect(() => {
    const korea = document.getElementById("korea");
    const china = document.getElementById("china");
    const japan = document.getElementById("japan");
    const western = document.getElementById("western");
    const cafe = document.getElementById("cafe");

    if (selectedCategory === "korea") {
      korea.className = "menu_selected";
      china.className = "";
      japan.className = "";
      western.className = "";
      cafe.className = "";
    } else if (selectedCategory === "china") {
      korea.className = "";
      china.className = "menu_selected";
      japan.className = "";
      western.className = "";
      cafe.className = "";
    } else if (selectedCategory === "japan") {
      korea.className = "";
      china.className = "";
      japan.className = "menu_selected";
      western.className = "";
      cafe.className = "";
    } else if (selectedCategory === "western") {
      korea.className = "";
      china.className = "";
      japan.className = "";
      western.className = "menu_selected";
      cafe.className = "";
    } else if (selectedCategory === "cafe") {
      korea.className = "";
      china.className = "";
      japan.className = "";
      western.className = "";
      cafe.className = "menu_selected";
    }
  }, [selectedCategory]);

  var positions = getData?.map((data) => {
    // console.log("data:", data);
    return {
      shop_id: data.id,
      name: data.name,
      lat: data.lat,
      lng: data.long,
      address: data.address,
      now_table_count: data.now_table_count,
      total_table_count: data.total_table_count,
      photo: data.photo,
      telephone: data.telephone,
      holiday: data.holiday,
      category: data.category,
      // rating: data.rating,
      marker1: marker1,
      marker2: marker2,
      marker3: marker3,
      marker4: marker4,
      marker5: marker5,
    };
  });

  // 휴일 / 테이블 수에 따른 마커색 변경
  const marker = positions?.map((marker_object) => {
    if (marker_object.holiday === "1") {
      return (
        <MapMarker
          //   key={marker_object.shop_id}
          position={{
            lat: marker_object.lat,
            lng: marker_object.lng,
          }}
          onClick={() => event(marker_object.name)}
          image={{
            src: `${marker_object.marker5}`, // 마커이미지의 주소입니다
            size: {
              width: 44,
              height: 55,
            }, // 마커이미지의 크기입니다
            options: {
              offset: {
                x: 27,
                y: 69,
              }, // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
            },
          }}
        />
      );
    } else if (marker_object.holiday === "0") {
      if (
        (marker_object.now_table_count / marker_object.total_table_count) *
          100 <
        33
      ) {
        return (
          <MapMarker
            // key={marker_object.shop_id}
            position={{
              lat: marker_object.lat,
              lng: marker_object.lng,
            }}
            onClick={() => event(marker_object.name)}
            image={{
              src: `${marker_object.marker1}`, // 마커이미지의 주소입니다
              size: {
                width: 44,
                height: 55,
              }, // 마커이미지의 크기입니다
              options: {
                offset: {
                  x: 27,
                  y: 69,
                }, // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
              },
            }}
          />
        );
      } else if (
        (marker_object.now_table_count / marker_object.total_table_count) *
          100 <
        66
      ) {
        return (
          <MapMarker
            // key={marker_object.shop_id}
            position={{
              lat: marker_object.lat,
              lng: marker_object.lng,
            }}
            onClick={() => event(marker_object.name)}
            image={{
              src: `${marker_object.marker2}`, // 마커이미지의 주소입니다
              size: {
                width: 44,
                height: 55,
              }, // 마커이미지의 크기입니다
              options: {
                offset: {
                  x: 27,
                  y: 69,
                }, // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
              },
            }}
          />
        );
      } else if (
        (marker_object.now_table_count / marker_object.total_table_count) *
          100 <
        99
      ) {
        return (
          <MapMarker
            // key={marker_object.shop_id}
            position={{
              lat: marker_object.lat,
              lng: marker_object.lng,
            }}
            onClick={() => event(marker_object.name)}
            image={{
              src: `${marker_object.marker3}`, // 마커이미지의 주소입니다
              size: {
                width: 44,
                height: 55,
              }, // 마커이미지의 크기입니다
              options: {
                offset: {
                  x: 27,
                  y: 69,
                }, // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
              },
            }}
          />
        );
      } else if (
        (marker_object.now_table_count / marker_object.total_table_count) *
          100 ===
        100
      ) {
        return (
          <MapMarker
            // key={marker_object.shop_id}
            position={{
              lat: marker_object.lat,
              lng: marker_object.lng,
            }}
            onClick={() => event(marker_object.name)}
            image={{
              src: `${marker_object.marker4}`, // 마커이미지의 주소입니다
              size: {
                width: 44,
                height: 55,
              }, // 마커이미지의 크기입니다
              options: {
                offset: {
                  x: 27,
                  y: 69,
                }, // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
              },
            }}
          />
        );
      }
    }
  });

  return (
    <>
      {/* <DebugStates positions={positions} getData={getData} /> */}
      {/* <RemovableCustomOverlayStyle /> */}
      <div id="map_wrap">
        <Map // 지도를 표시할 Container
          id={`map`}
          center={{
            // 지도의 중심좌표
            lat: 36.32965442153325,
            lng: 127.44302364150629,
          }}
          style={{
            // 지도의 크기
            width: "100%",
            height: "700px",
          }}
          level={5} // 지도의 확대 레벨
        >
          {/* 테이블 수 비율별 마커색 변경 */}

          {selectedCategory === "korea" &&
            positions
              ?.filter((p) => p.category === "한식")
              .map((position) => (
                <MapMarker
                  key={`korea-${position.lat},${position.lng}`}
                  position={position}
                  image={{
                    src: markerImageSrc,
                    size: imageSize,
                    options: {
                      spriteSize: spriteSize,
                      spriteOrigin: koreaOrigin,
                    },
                  }}
                />
              ))}
          {selectedCategory === "china" &&
            positions
              ?.filter((p) => p.category === "중식")
              .map((position) => (
                <MapMarker
                  key={`china-${position.lat},${position.lng}`}
                  position={position}
                  image={{
                    src: markerImageSrc,
                    size: imageSize,
                    options: {
                      spriteSize: spriteSize,
                      spriteOrigin: chinaOrigin,
                    },
                  }}
                />
              ))}
          {selectedCategory === "japan" &&
            positions
              ?.filter((p) => p.category === "일식")
              .map((position) => (
                <MapMarker
                  key={`japan-${position.lat},${position.lng}`}
                  position={position}
                  image={{
                    src: markerImageSrc,
                    size: imageSize,
                    options: {
                      spriteSize: spriteSize,
                      spriteOrigin: japanOrigin,
                    },
                  }}
                />
              ))}
          {selectedCategory === "western" &&
            positions
              ?.filter((p) => p.category === "양식")
              .map((position) => (
                <MapMarker
                  key={`western-${position.lat},${position.lng}`}
                  position={position}
                  image={{
                    src: markerImageSrc,
                    size: imageSize,
                    options: {
                      spriteSize: spriteSize,
                      spriteOrigin: westernOrigin,
                    },
                  }}
                />
              ))}
          {selectedCategory === "cafe" &&
            positions
              ?.filter((p) => p.category === "카페")
              .map((position) => (
                <MapMarker
                  key={`cafe-${position.lat},${position.lng}`}
                  position={position}
                  image={{
                    src: markerImageSrc,
                    size: imageSize,
                    options: {
                      spriteSize: spriteSize,
                      spriteOrigin: cafeOrigin,
                    },
                  }}
                />
              ))}

          {getData && (
            <>
              {marker}
              {isOpen &&
                positions
                  ?.filter((p) => p.name === overlay)
                  .map((data_object) => (
                    <CustomOverlayMap
                      position={{ lat: data_object.lat, lng: data_object.lng }}
                      //   key={data_object.shop_id}
                    >
                      <div className="wrap">
                        <div className="info">
                          <div className="title">
                            {data_object.name}
                            <div
                              className="close"
                              onClick={() => setIsOpen(false)}
                              title="닫기"
                            ></div>
                          </div>
                          <div className="body">
                            <div className="img">
                              <img
                                src={`${data_object.photo}`}
                                width="73"
                                height="70"
                                alt="카카오 스페이스닷원"
                              />
                            </div>
                            <div className="desc">
                              <div className="ellipsis">
                                {data_object.address}
                              </div>
                              <div className="jibun ellipsis">
                                {data_object.telephone}
                              </div>
                              <div>
                                <Link to={`/shop/${data_object.shop_id}/`}>
                                  매장으로
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CustomOverlayMap>
                  ))}
            </>
          )}
        </Map>
        {/* 카테고리 부분 */}
        <div className="category">
          <ul>
            <li id="korea" onClick={() => closeEvent("korea")}>
              한식
            </li>
            <li id="china" onClick={() => closeEvent("china")}>
              중식
            </li>
            <li id="japan" onClick={() => closeEvent("japan")}>
              일식
            </li>
            <li id="western" onClick={() => closeEvent("western")}>
              양식
            </li>
            <li id="cafe" onClick={() => closeEvent("cafe")}>
              카페
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default TypeMap;

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
  const [closeMarker, setCloseMarker] = useState();

  const event = (name) => {
    setIsOpen(true);
    setOverlay(name);
  };

  const closeEvent = (category) => {
    setCloseMarker(false);
    setSelectedCategory(category);
  };

  const [selectedCategory, setSelectedCategory] = useState("whole");

  useEffect(() => {
    const whole = document.getElementById("whole");
    const korea = document.getElementById("korea");
    const china = document.getElementById("china");
    const japan = document.getElementById("japan");
    const western = document.getElementById("western");
    const cafe = document.getElementById("cafe");

    if (selectedCategory === "whole") {
      whole.className = "menu_selected";
      korea.className = "";
      china.className = "";
      japan.className = "";
      western.className = "";
      cafe.className = "";
    } else if (selectedCategory === "korea") {
      whole.className = "";
      korea.className = "menu_selected";
      china.className = "";
      japan.className = "";
      western.className = "";
      cafe.className = "";
    } else if (selectedCategory === "china") {
      whole.className = "";
      korea.className = "";
      china.className = "menu_selected";
      japan.className = "";
      western.className = "";
      cafe.className = "";
    } else if (selectedCategory === "japan") {
      whole.className = "";
      korea.className = "";
      china.className = "";
      japan.className = "menu_selected";
      western.className = "";
      cafe.className = "";
    } else if (selectedCategory === "western") {
      whole.className = "";
      korea.className = "";
      china.className = "";
      japan.className = "";
      western.className = "menu_selected";
      cafe.className = "";
    } else if (selectedCategory === "cafe") {
      whole.className = "";
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

  function map_marker(marker_object) {
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
  }

  return (
    <>
      {/* <DebugStates positions={positions} getData={getData} /> */}
      {/* <RemovableCustomOverlayStyle /> */}
      <div id="map_wrap">
        <Map // 지도를 표시할 Container
          id={`map`}
          className=""
          center={{
            // 지도의 중심좌표
            lat: 36.337490378182764,
            lng: 127.44915430991462,
          }}
          style={{
            // 지도의 크기
            width: "100%",
            height: "700px",
          }}
          level={6} // 지도의 확대 레벨
        >
          {/* 테이블 수 비율별 마커색 변경 */}
          {selectedCategory === "whole" &&
            positions?.map((marker_object) => {
              return map_marker(marker_object);
            })}
          {selectedCategory === "korea" &&
            positions
              ?.filter((p) => p.category === "한식")
              .map((marker_object) => {
                return map_marker(marker_object);
              })}
          {selectedCategory === "china" &&
            positions
              ?.filter((p) => p.category === "중식")
              .map((marker_object) => {
                return map_marker(marker_object);
              })}
          {selectedCategory === "japan" &&
            positions
              ?.filter((p) => p.category === "일식")
              .map((marker_object) => {
                return map_marker(marker_object);
              })}
          {selectedCategory === "western" &&
            positions
              ?.filter((p) => p.category === "양식")
              .map((marker_object) => {
                return map_marker(marker_object);
              })}
          {selectedCategory === "cafe" &&
            positions
              ?.filter((p) => p.category === "카페")
              .map((marker_object) => {
                return map_marker(marker_object);
              })}

          {getData && (
            <>
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
                                <Link
                                  className="text-blue-600"
                                  to={`/shop/${data_object.shop_id}/`}
                                >
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
            <li
              className="xl:w-1/3 xl:ml-14 lg:w-2/5 lg:ml-12 md:w-2/5 w-5/6 md:ml-8 sm:mx-auto sm:mb-10"
              id="whole"
              onClick={() => closeEvent("whole")}
            >
              전체
            </li>
            <li
              className="xl:w-1/3 xl:ml-14 lg:w-2/5 lg:ml-12 md:w-2/5 w-5/6 md:ml-8 sm:mx-auto sm:mb-10"
              id="korea"
              onClick={() => closeEvent("korea")}
            >
              한식
            </li>
            <li
              className="xl:w-1/3 xl:ml-14 lg:w-2/5 lg:ml-12 md:w-2/5 w-5/6 md:ml-8 sm:mx-auto sm:mb-10"
              id="china"
              onClick={() => closeEvent("china")}
            >
              중식
            </li>
            <li
              className="xl:w-1/3 xl:ml-14 lg:w-2/5 lg:ml-12 md:w-2/5 w-5/6 md:ml-8 sm:mx-auto sm:mb-10"
              id="japan"
              onClick={() => closeEvent("japan")}
            >
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

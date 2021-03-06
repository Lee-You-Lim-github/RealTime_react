import { useEffect, useState, useRef, useCallback } from "react";
import { Map, MapMarker, CustomOverlayMap } from "react-kakao-maps-sdk";
import marker1 from "assets/img/marker1.png";
import marker2 from "assets/img/marker2.png";
import marker3 from "assets/img/marker3.png";
import marker4 from "assets/img/marker4.png";
import marker5 from "assets/img/marker5.png";
import { Link } from "react-router-dom";
import styles from "./sidebar.module.css";
import question from "assets/img/adminlist.png";
import remove from "assets/img/adminlist2.png";

import cutlery from "assets/img/cutlery.png";
import colorcutlery from "assets/img/colorcutlery.png";

import tteok from "assets/img/tteok.png";
import colortteok from "assets/img/colortteok.png";

import dumpling from "assets/img/dumpling.png";
import colordumpling from "assets/img/colordumpling.png";

import sushi from "assets/img/sushi.png";
import colorsushi from "assets/img/colorsushi.png";

import pasta from "assets/img/pasta.png";
import colorpasta from "assets/img/colorpasta.png";

import coffee from "assets/img/coffee.png";
import colorcoffee from "assets/img/colorcoffee.png";

import pick from "assets/img/heart3.png";
import colorpick from "assets/img/colorpick.png";

import "./Map.css";

function TypeMap({ getData, pickData }) {
  const [isOpen, setIsOpen] = useState(false);
  const [overlay, setOverlay] = useState();
  const [closeMarker, setCloseMarker] = useState();
  const [open, setOpen] = useState(false);
  const [xPosition, setX] = useState(217);
  const side = useRef();

  const [wholeHover, setWholeHover] = useState(false);
  const [koreaHover, setKoreaHover] = useState(false);
  const [chinaHover, setChinaHover] = useState(false);
  const [japanHover, setJapanHover] = useState(false);
  const [westernHover, setWesternHover] = useState(false);
  const [cafeHover, setCafeHover] = useState(false);
  const [pickHover, setPickHover] = useState(false);

  const [color, setColor] = useState("");

  const [state, setState] = useState({
    center: {
      lat: 36.337490378182764,
      lng: 127.44915430991462,
    },
    isPanto: false,
    errMsg: null,
    isLoading: true,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      // GeoLocation??? ???????????? ?????? ????????? ???????????????
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setState((prev) => ({
            ...prev,
            center: {
              lat: position.coords.latitude, // ??????
              lng: position.coords.longitude, // ??????
            },
          }));
        },
        (err) => {
          setState((prev) => ({
            ...prev,
            errMsg: err.message,
            isLoading: false,
          }));
        }
      );
    } else {
      // HTML5??? GeoLocation??? ????????? ??? ????????? ?????? ?????? ????????? ??????????????? ????????? ???????????????
      setState((prev) => ({
        ...prev,
        errMsg: "geolocation??? ???????????? ?????????..",
        isLoading: false,
      }));
    }
  }, []);

  // button ?????? ??? ??????
  const toggleMenu = () => {
    if (xPosition > 0) {
      setX(0);
      setOpen(true);
    } else {
      setX(217);
      setOpen(false);
    }
  };

  // ???????????? ?????? ????????? ????????? ??????
  const handleClose = async (e) => {
    let sideArea = side.current;
    let sideCildren = side.current.contains(e.target);
    if (open && (!sideArea || !sideCildren)) {
      await setX(217);
      await setOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleClose);
    return () => {
      window.removeEventListener("click", handleClose);
    };
  });

  const event = (name, lat, lng) => {
    setIsOpen(true);
    setOverlay(name);
    setState({
      center: { lat: lat, lng: lng },
      isPanto: true,
    });
  };

  const closeEvent = (category) => {
    setCloseMarker(false);
    setColor(category);
    setSelectedCategory(category);
  };

  const [selectedCategory, setSelectedCategory] = useState("whole");

  useEffect(() => {}, [selectedCategory]);

  useEffect(() => {}, [setColor]);

  const positions = getData?.map((data) => {
    return {
      shop_id: data.id,
      name: data.name,
      lat: data.lat,
      lng: data.longitude,
      address: data.address,
      now_table_count: data.now_table_count,
      total_table_count: data.total_table_count,
      photo: data.photo1,
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

  const positions2 = pickData?.map((data) => {
    return {
      shop_id: data.shop_id.id,
      name: data.shop_id.name,
      lat: data.shop_id.lat,
      lng: data.shop_id.longitude,
      address: data.shop_id.address,
      now_table_count: data.shop_id.now_table_count,
      total_table_count: data.shop_id.total_table_count,
      photo: data.shop_id.photo1,
      telephone: data.shop_id.telephone,
      holiday: data.shop_id.holiday,
      category: data.shop_id.category,
      marker1: marker1,
      marker2: marker2,
      marker3: marker3,
      marker4: marker4,
      marker5: marker5,
    };
  });

  const map_marker = useCallback((marker_object) => {
    // setPoints((prev) => [
    //   ...prev,
    //   { lat: marker_object.lat, lng: marker_object.lng },
    // ]);
    if (marker_object.holiday === "1") {
      return (
        <MapMarker
          //   key={marker_object.shop_id}
          position={{
            lat: marker_object.lat,
            lng: marker_object.lng,
          }}
          onClick={() =>
            event(marker_object.name, marker_object.lat, marker_object.lng)
          }
          image={{
            src: `${marker_object.marker5}`, // ?????????????????? ???????????????
            size: {
              width: 33,
              height: 44,
            }, // ?????????????????? ???????????????
            options: {
              offset: {
                x: 27,
                y: 69,
              }, // ?????????????????? ???????????????. ????????? ????????? ???????????? ????????? ???????????? ????????? ???????????????.
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
            onClick={() =>
              event(marker_object.name, marker_object.lat, marker_object.lng)
            }
            image={{
              src: `${marker_object.marker1}`, // ?????????????????? ???????????????
              size: {
                width: 33,
                height: 44,
              }, // ?????????????????? ???????????????
              options: {
                offset: {
                  x: 27,
                  y: 69,
                }, // ?????????????????? ???????????????. ????????? ????????? ???????????? ????????? ???????????? ????????? ???????????????.
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
            onClick={() =>
              event(marker_object.name, marker_object.lat, marker_object.lng)
            }
            image={{
              src: `${marker_object.marker2}`, // ?????????????????? ???????????????
              size: {
                width: 33,
                height: 44,
              }, // ?????????????????? ???????????????
              options: {
                offset: {
                  x: 27,
                  y: 69,
                }, // ?????????????????? ???????????????. ????????? ????????? ???????????? ????????? ???????????? ????????? ???????????????.
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
            onClick={() =>
              event(marker_object.name, marker_object.lat, marker_object.lng)
            }
            image={{
              src: `${marker_object.marker3}`, // ?????????????????? ???????????????
              size: {
                width: 33,
                height: 44,
              }, // ?????????????????? ???????????????
              options: {
                offset: {
                  x: 27,
                  y: 69,
                }, // ?????????????????? ???????????????. ????????? ????????? ???????????? ????????? ???????????? ????????? ???????????????.
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
            onClick={() =>
              event(marker_object.name, marker_object.lat, marker_object.lng)
            }
            image={{
              src: `${marker_object.marker4}`, // ?????????????????? ???????????????
              size: {
                width: 33,
                height: 44,
              }, // ?????????????????? ???????????????
              options: {
                offset: {
                  x: 27,
                  y: 69,
                }, // ?????????????????? ???????????????. ????????? ????????? ???????????? ????????? ???????????? ????????? ???????????????.
              },
            }}
          />
        );
      }
    }
  });

  return (
    <>
      <div>
        <Map // ????????? ????????? Container
          center={
            // ????????? ????????????
            state.center
          }
          style={{
            // ????????? ??????
            width: "1000px",
            height: "430px",
          }}
          level={5} // ????????? ?????? ??????
        >
          {/* ????????? ??? ????????? ????????? ?????? */}
          {selectedCategory === "whole" &&
            positions?.map((marker_object) => {
              return map_marker(marker_object);
            })}
          {selectedCategory === "korea" &&
            positions
              ?.filter((p) => p.category === "??????")
              .map((marker_object) => {
                return map_marker(marker_object);
              })}
          {selectedCategory === "china" &&
            positions
              ?.filter((p) => p.category === "??????")
              .map((marker_object) => {
                return map_marker(marker_object);
              })}
          {selectedCategory === "japan" &&
            positions
              ?.filter((p) => p.category === "??????")
              .map((marker_object) => {
                return map_marker(marker_object);
              })}
          {selectedCategory === "western" &&
            positions
              ?.filter((p) => p.category === "??????")
              .map((marker_object) => {
                return map_marker(marker_object);
              })}

          {selectedCategory === "cafe" &&
            positions
              ?.filter((p) => p.category === "??????")
              .map((marker_object) => {
                return map_marker(marker_object);
              })}

          {selectedCategory === "pick" &&
            positions2?.map((marker_object) => {
              return map_marker(marker_object);
            })}

          {selectedCategory === "relax" &&
            positions
              ?.filter(
                (p) =>
                  p.holiday === "0" &&
                  (p.now_table_count / p.total_table_count) * 100 < 34
              )
              .map((marker_object) => {
                return map_marker(marker_object);
              })}

          {selectedCategory === "normal" &&
            positions
              ?.filter(
                (p) =>
                  p.holiday === "0" &&
                  (p.now_table_count / p.total_table_count) * 100 > 33 &&
                  (p.now_table_count / p.total_table_count) * 100 < 67
              )
              .map((marker_object) => {
                return map_marker(marker_object);
              })}

          {selectedCategory === "chaos" &&
            positions
              ?.filter(
                (p) =>
                  p.holiday === "0" &&
                  (p.now_table_count / p.total_table_count) * 100 > 66 &&
                  (p.now_table_count / p.total_table_count) * 100 < 100
              )
              .map((marker_object) => {
                return map_marker(marker_object);
              })}

          {selectedCategory === "max" &&
            positions
              ?.filter(
                (p) =>
                  p.holiday === "0" &&
                  (p.now_table_count / p.total_table_count) * 100 === 100
              )
              .map((marker_object) => {
                return map_marker(marker_object);
              })}

          {selectedCategory === "holiday" &&
            positions
              ?.filter((p) => p.holiday === "1")
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
                              title="??????"
                            ></div>
                          </div>
                          <div className="body">
                            <div className="img">
                              <img
                                src={`${data_object.photo}`}
                                width="73"
                                height="70"
                                alt="????????? ??????????????????"
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
                                  ????????????
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
        {/* ???????????? ?????? */}
        <div className="flex justify-center mr-32 mt-4">
          <ul className="ml-2">
            <button
              className="mr-[80px]"
              id="whole"
              onClick={() => {
                // if (map) map.setBounds(bounds);
                closeEvent("whole");
              }}
            >
              {color !== "whole" ? (
                <img src={cutlery} width="70" height="70" />
              ) : (
                <img src={colorcutlery} width="70" height="70" />
              )}
              ??????
            </button>

            <button
              className="mr-[80px]"
              id="korea"
              onClick={() => {
                // if (map) map.setBounds(bounds);
                closeEvent("korea");
              }}
            >
              {color !== "korea" ? (
                <img src={tteok} width="70" height="70" />
              ) : (
                <img src={colortteok} width="70" height="70" />
              )}
              ??????
            </button>
            <button
              className="mr-[80px]"
              id="china"
              onClick={() => closeEvent("china")}
            >
              {color !== "china" ? (
                <img src={dumpling} width="70" height="70" />
              ) : (
                <img src={colordumpling} width="70" height="70" />
              )}
              ??????
            </button>
            <button
              className="mr-[80px]"
              id="japan"
              onClick={() => closeEvent("japan")}
            >
              {color !== "japan" ? (
                <img src={sushi} width="70" height="70" />
              ) : (
                <img src={colorsushi} width="70" height="70" />
              )}
              ??????
            </button>
            <button
              className="mr-[80px]"
              id="western"
              onClick={() => closeEvent("western")}
            >
              {color !== "western" ? (
                <img src={pasta} width="70" height="70" />
              ) : (
                <img src={colorpasta} width="70" height="70" />
              )}
              ??????
            </button>
            <button
              className="mr-[80px]"
              id="cafe"
              onClick={() => closeEvent("cafe")}
            >
              {color !== "cafe" ? (
                <img src={coffee} width="70" height="70" />
              ) : (
                <img src={colorcoffee} width="70" height="70" />
              )}
              ??????
            </button>
            <button
              className="mr-[80px]"
              id="pick"
              onClick={() => closeEvent("pick")}
            >
              {color !== "pick" ? (
                <img src={pick} width="70" height="70" />
              ) : (
                <img src={colorpick} width="70" height="70" />
              )}
              ???
            </button>
          </ul>
        </div>
      </div>
      <div className={styles.container}>
        <div
          ref={side}
          className={styles.sidebar}
          style={{
            width: `${200}px`,

            transform: `translatex(${-xPosition}px)`,
          }}
        >
          <button onClick={() => toggleMenu()} className={styles.button}>
            {open ? (
              <span>
                <img className="bg-auto" src={remove} />
              </span>
            ) : (
              <div
                style={{
                  textAlign: "center",
                  display: "inline-block",
                  lineHeight: "25px",
                }}
                className="text-4xl"
              >
                <img className="w-30 h-30" src={question} />
              </div>
            )}
          </button>
          <div className="px-4">
            <h2 className="ml-5 mb-5 text-2xl">????????? ??????</h2>
            <ul>
              <li className="mb-5">
                <div
                  style={{
                    backgroundColor: "blue",
                    width: 50,
                    height: 50,
                    display: "inline-block",
                    margin: 5,
                    borderRadius: 50,
                    textAlign: "center",
                    userSelect: "none",
                    lineHeight: "50px",
                  }}
                >
                  <button
                    id="relax"
                    onClick={() => closeEvent("relax")}
                    className="text-white font-bold"
                  >
                    ??????
                  </button>
                </div>
                <span
                  style={{
                    margin: 10,
                  }}
                >
                  0~33%
                </span>
              </li>
              <li className="mb-5">
                <div
                  style={{
                    backgroundColor: "green",
                    width: 50,
                    height: 50,
                    display: "inline-block",
                    margin: 5,
                    borderRadius: 50,
                    textAlign: "center",
                    userSelect: "none",
                    lineHeight: "50px",
                  }}
                >
                  <button
                    id="normal"
                    onClick={() => closeEvent("normal")}
                    className="text-white font-bold"
                  >
                    ??????
                  </button>
                </div>
                <span
                  style={{
                    margin: 10,
                  }}
                >
                  33~66%
                </span>
              </li>
              <li className="mb-5">
                <div
                  style={{
                    backgroundColor: "orange",
                    width: 50,
                    height: 50,
                    display: "inline-block",
                    margin: 5,
                    borderRadius: 50,
                    textAlign: "center",
                    userSelect: "none",
                    lineHeight: "50px",
                  }}
                >
                  <button
                    id="chaos"
                    onClick={() => closeEvent("chaos")}
                    className="text-white font-bold"
                  >
                    ??????
                  </button>
                </div>
                <span
                  style={{
                    margin: 10,
                  }}
                >
                  66~99%
                </span>
              </li>
              <li className="mb-5">
                <div
                  style={{
                    backgroundColor: "red",
                    width: 50,
                    height: 50,
                    display: "inline-block",
                    margin: 5,
                    borderRadius: 50,
                    textAlign: "center",
                    userSelect: "none",
                    lineHeight: "50px",
                  }}
                >
                  <button
                    id="max"
                    onClick={() => closeEvent("max")}
                    className="text-white font-bold"
                  >
                    ??????
                  </button>
                </div>
                <span
                  style={{
                    margin: 10,
                  }}
                >
                  100%
                </span>
              </li>
              <li className="mb-5">
                <div
                  style={{
                    backgroundColor: "gray",
                    width: 50,
                    height: 50,
                    display: "inline-block",
                    margin: 5,
                    borderRadius: 50,
                    textAlign: "center",
                    userSelect: "none",
                    lineHeight: "50px",
                  }}
                >
                  <button
                    id="holiday"
                    onClick={() => closeEvent("holiday")}
                    className="text-white font-bold"
                  >
                    ??????
                  </button>
                </div>
                <span
                  style={{
                    display: "inline-block",
                    margin: 10,
                  }}
                >
                  ??????
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default TypeMap;

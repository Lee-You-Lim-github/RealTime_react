/*global kakao */
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import marker1 from "assets/img/marker1.png";
import marker2 from "assets/img/marker2.png";
import marker3 from "assets/img/marker3.png";
import marker4 from "assets/img/marker4.png";
import marker5 from "assets/img/marker5.png";

const Map = () => {
  const navigate = useNavigate();
  useEffect(() => {
    var mapContainer = document.getElementById("map"), // 지도를 표시할 div
      mapOption = {
        center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
        level: 3, // 지도의 확대 레벨
      };

    var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

    // 마커를 표시할 위치와 title 객체 배열입니다
    var positions = [
      {
        title: "카카오",
        latlng: new kakao.maps.LatLng(33.4507, 126.57067),
        add: "제주도 카카오시",
        table: 15,
        max_table: 15,
      },
      {
        title: "생태연못",
        latlng: new kakao.maps.LatLng(33.45093, 126.56947),
        add: "제주특별자치도 연못군",
        table: 13,
        max_table: 15,
      },
      {
        title: "텃밭",
        latlng: new kakao.maps.LatLng(33.45087, 126.56994),
        add: "제주특별자치도 연못 옆자리 텃밭읍",
        table: 7,
        max_table: 20,
      },
      {
        title: "근린공원",
        latlng: new kakao.maps.LatLng(33.45139, 126.57073),
        add: "제주특별자치도 중앙시 근린공원",
        table: 2,
        max_table: 25,
      },
    ];

    // 마커 이미지의 이미지 주소입니다

    for (var i = 0; i < positions.length; i++) {
      if ((positions[i].table / positions[i].max_table) * 100 < 33) {
        var imageSize = new kakao.maps.Size(44, 55);
        var markerImage = new kakao.maps.MarkerImage(marker1, imageSize);
      } else if ((positions[i].table / positions[i].max_table) * 100 < 66) {
        var imageSize = new kakao.maps.Size(44, 55);
        var markerImage = new kakao.maps.MarkerImage(marker2, imageSize);
      } else if ((positions[i].table / positions[i].max_table) * 100 < 99) {
        var imageSize = new kakao.maps.Size(44, 55);
        var markerImage = new kakao.maps.MarkerImage(marker3, imageSize);
      } else if ((positions[i].table / positions[i].max_table) * 100 == 100) {
        var imageSize = new kakao.maps.Size(44, 55);
        var markerImage = new kakao.maps.MarkerImage(marker4, imageSize);
      }

      // 마커를 생성합니다
      var marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: positions[i].latlng, // 마커를 표시할 위치
        title: positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        image: markerImage, // 마커 이미지
      });

      var infocContent = `<div style="padding:30px;"> 
                            <div>${positions[i].title} </div> 
                            ${positions[i].add}
                            <button>
                            </button>
                          </div>`;

      var infowindow = new kakao.maps.InfoWindow({
        content: infocContent,
        // 인포윈도우에 표시할 내용
      });

      kakao.maps.event.addListener(marker, "click", function () {
        // 마커 위에 인포윈도우를 표시합니다
        infowindow.open(map, marker);
        navigate("/shop/1/");
      });

      kakao.maps.event.addListener(
        marker,
        "mouseover",
        makeOverListener(map, marker, infowindow)
      );
      kakao.maps.event.addListener(
        marker,
        "mouseout",
        makeOutListener(infowindow)
      );

      // 마커에 mouseover 이벤트와 mouseout 이벤트를 등록합니다
      // 이벤트 리스너로는 클로저를 만들어 등록합니다
      // for문에서 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
    }
    function makeOverListener(map, marker, infowindow) {
      return function () {
        infowindow.open(map, marker);
      };
    }

    // 인포윈도우를 닫는 클로저를 만드는 함수입니다
    function makeOutListener(infowindow) {
      return function () {
        infowindow.close();
      };
    }
  }, []);

  return (
    <div>
      <div id="map" style={{ width: "100vw", height: "100vh" }}></div>'
      <div className="mr-5">
        <infowindow />
      </div>
    </div>
  );
};

export default Map;

/*global kakao */

import "./Map.css";
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

    var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성

    // 마커를 표시할 위치와 title 객체 배열
    var positions = [
      {
        title: "카카오",
        latlng: new kakao.maps.LatLng(33.4507, 126.57067),
        add: "제주도 카카오시",
        table: 15,
        max_table: 15,
        rating: 4,
      },
      {
        title: "생태연못",
        latlng: new kakao.maps.LatLng(33.45093, 126.56947),
        add: "제주특별자치도 연못군",
        table: 13,
        max_table: 15,
        rating: 5,
      },
      {
        title: "텃밭",
        latlng: new kakao.maps.LatLng(33.45087, 126.56994),
        add: "제주특별자치도 연못 옆자리 텃밭읍",
        table: 7,
        max_table: 20,
        rating: 3,
      },
      {
        title: "근린공원",
        latlng: new kakao.maps.LatLng(33.45139, 126.57073),
        add: "제주특별자치도 중앙시 근린공원",
        table: 2,
        max_table: 25,
        rating: 5,
      },
    ];
    for (var i = 0; i < positions.length; i++) {
      var imageSize = new kakao.maps.Size(44, 55);
      if ((positions[i].table / positions[i].max_table) * 100 < 33) {
        var markerImage = new kakao.maps.MarkerImage(marker1, imageSize);
      } else if ((positions[i].table / positions[i].max_table) * 100 < 66) {
        var markerImage = new kakao.maps.MarkerImage(marker2, imageSize);
      } else if ((positions[i].table / positions[i].max_table) * 100 < 99) {
        var markerImage = new kakao.maps.MarkerImage(marker3, imageSize);
      } else if ((positions[i].table / positions[i].max_table) * 100 == 100) {
        var markerImage = new kakao.maps.MarkerImage(marker4, imageSize);
      }

      var infoContent =
        '<div class="wrap">' +
        '    <div class="info">' +
        '        <div class="title">' +
        `            ${positions[i].title}` +
        "        </div>" +
        '        <div class="body">' +
        '            <div class="img">' +
        '                <img src="https://cfile181.uf.daum.net/image/250649365602043421936D" width="73" height="70">' +
        "           </div>" +
        '            <div class="desc">' +
        `                <div class="ellipsis">${positions[i].add}</div>` +
        `                <div class="jibun ellipsis">별점 : ${positions[i].rating}</div>` +
        '                <div><a href="https://www.kakaocorp.com/main" target="_blank" class="link">홈페이지</a></div>' +
        "            </div>" +
        "        </div>" +
        "    </div>" +
        "</div>";

      // 마커를 생성

      var marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: positions[i].latlng, // 마커를 표시할 위치
        image: markerImage, // 마커 이미지
      });

      var overlay = new kakao.maps.CustomOverlay({
        position: positions[i].latlng,
        content: infoContent, // 인포윈도우에 표시할 내용
      });

      kakao.maps.event.addListener(marker, "click", function () {
        navigate("/shop/1/");
      });

      // 마커에 mouseover 이벤트와 mouseout 이벤트를 등록
      // 이벤트 리스너로는 클로저를 만들어 등록

      kakao.maps.event.addListener(
        marker,
        "mouseover",
        makeOverListener(map, marker, overlay)
      );

      kakao.maps.event.addListener(
        marker,
        "mouseout",
        makeOutListener(overlay)
      );
    }
    function makeOverListener(map, marker, overlay) {
      return function () {
        overlay.setMap(map, marker, overlay);
      };
    }
    function makeOutListener(overlay) {
      return function () {
        overlay.setMap(null);
      };
    }
  }, []);

  return <div id="map" style={{ width: "100vw", height: "100vh" }}></div>;
};

export default Map;

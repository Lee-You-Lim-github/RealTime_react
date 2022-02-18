/*global kakao */

import "./Map.css";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import marker1 from "assets/img/marker1.png";
import marker2 from "assets/img/marker2.png";
import marker3 from "assets/img/marker3.png";
import marker4 from "assets/img/marker4.png";
import marker5 from "assets/img/marker5.png";
import { useApiAxios } from "api/base";
import DebugStates from "components/DebugStates";
import { CustomOverlayMap } from "react-kakao-maps-sdk";
import { data } from "autoprefixer";

function Map({ getData }) {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const shopObject = Object.assign({}, getData);
  console.log("shopObject:", shopObject);

  useEffect(() => {
    var mapContainer = document.getElementById("map"), // 지도를 표시할 div
      mapOption = {
        center: new kakao.maps.LatLng(36.33293849894394, 127.4339577406385), // 지도의 중심좌표
        level: 5, // 지도의 확대 레벨
      };

    var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성

    // 마커를 표시할 위치와 title 객체 배열
    var positions = getData?.map((data) => {
      console.log("data:", data);
      return {
        shop_id: data.id,
        name: data.name,
        latlng: new kakao.maps.LatLng(data.lat, data.long),
        address: data.address,
        now_table_count: data.now_table_count,
        total_table_count: data.total_table_count,
        photo: data.photo,
        telephone: data.telephone,
        holiday: data.holiday,
        // rating: data.rating,
      };
    });

    for (var i = 0; i < positions.length; i++) {
      var imageSize = new kakao.maps.Size(44, 55);
      if (positions[i].holiday === "1") {
        var markerImage = new kakao.maps.MarkerImage(marker5, imageSize);
      } else if (positions[i].holiday === "0") {
        if (
          (positions[i].now_table_count / positions[i].total_table_count) *
            100 <
          33
        ) {
          var markerImage = new kakao.maps.MarkerImage(marker1, imageSize);
        } else if (
          (positions[i].now_table_count / positions[i].total_table_count) *
            100 <
          66
        ) {
          var markerImage = new kakao.maps.MarkerImage(marker2, imageSize);
        } else if (
          (positions[i].now_table_count / positions[i].total_table_count) *
            100 <
          99
        ) {
          var markerImage = new kakao.maps.MarkerImage(marker3, imageSize);
        } else if (
          (positions[i].now_table_count / positions[i].total_table_count) *
            100 ===
          100
        ) {
          var markerImage = new kakao.maps.MarkerImage(marker4, imageSize);
        }
      }

      var infoContent =
        '<div class="wrap">' +
        '    <div class="info">' +
        '        <div class="title">' +
        `            ${positions[i].name}` +
        `            <div class="close" onclick="" title="닫기"></div>` +
        "        </div>" +
        '        <div class="body">' +
        '            <div class="img">' +
        `                <img src=${positions[i].photo} width="70" height="70">` +
        "           </div>" +
        '            <div class="desc">' +
        `                <div class="ellipsis">${positions[i].address}</div>` +
        // `                <div class="jibun ellipsis">별점 : ${positions[i].rating}</div>` +
        `                <div class="ellipsis">Tel : ${positions[i].telephone}</div>` +
        `                <div><a href="/shop/${positions[i].shop_id}/" class="link">매장 상세보기</a></div>` +
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

      // 마커에 mouseover 이벤트와 mouseout 이벤트를 등록
      // 이벤트 리스너로는 클로저를 만들어 등록

      // kakao.maps.event.addListener(
      //   marker,
      //   "mouseover",
      //   makeOverListener(map, marker, overlay)
      // );

      // kakao.maps.event.addListener(marker, "mouseout", closeOverlay(overlay));
      kakao.maps.event.addListener(
        marker,
        "click",
        makeOverListener(map, marker, overlay)
      );

      kakao.maps.event.addListener(map, "click", closeOverlay(overlay));
      // kakao.maps.event.addListener(map, "click", closeOverlay(marker));
    }
    function makeOverListener(map, marker, overlay) {
      return function () {
        overlay.setMap(map, marker, overlay);
      };
    }
    function closeOverlay(overlay) {
      overlay.setMap(null);
      // marker.setMap(null);
    }
  }, []);

  return (
    <div>
      <div id="map" style={{ width: "100vw", height: "100vh" }}></div>
      <DebugStates getData={getData} />
    </div>
  );
}

export default Map;

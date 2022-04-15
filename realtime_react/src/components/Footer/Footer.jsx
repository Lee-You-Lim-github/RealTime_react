import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

import instagram from "assets/img/instagram1.png";
import colorinstagram from "assets/img/colorinstagram.png";
import facebook from "assets/img/facebook1.png";
import colorfacebook from "assets/img/colorfacebook.png";

const Footer = () => {
  const [instaHover, setInstaHover] = useState(false);
  const [faceHover, setFaceHover] = useState(false);
  return (
    <footer className="text-center text-gray-400 text-sm lg:text-left bg-gray-100 text-gray-600">
      {/* footer body */}
      <div className="mx-64 py-6 text-center md:text-left">
        <h6
          className="
            uppercase
            font-semibold
            mb-4
            flex
            items-center
            justify-center
            md:justify-start
          "
        >
          <FontAwesomeIcon icon={faLocationDot} className="w-3 m-2 text-lg" />
          지금어때
        </h6>
        <p className="mt-2">
          (주)지금어때 |대표이사 : 이준수 | 사업자 등록번호 : 000-00-0000 |
          통신판매업신고 : 대전-00000호 | 메일 : help@realtime.com
        </p>
        <p className="mt-2">
          관광사업자 등록번호 : 제2016-31호 | 주소 : 대전 동구 계족로 151 |
          호스팅서비스 제공자 : 주식회사 지금어때
        </p>
        <p className="mt-2">고객센터 : 1644-1346 (오전 9시 - 익일 새벽 3시)</p>

        <button
          className="mt-6"
          onClick={() =>
            window.open(
              "https://www.instagram.com/realtime_official_/",
              "_blank"
            )
          }
        >
          <img
            onMouseOver={() => setInstaHover(true)}
            onMouseOut={() => setInstaHover(false)}
            src={instaHover ? colorinstagram : instagram}
            width="25"
            height="25"
          />
        </button>
        <button
          className=" ml-2 mt-6"
          onClick={() =>
            window.open(
              "https://www.facebook.com/%EC%A7%80%EA%B8%88%EC%96%B4%EB%95%8C-100728205952568/",
              "_blank"
            )
          }
        >
          <img
            onMouseOver={() => setFaceHover(true)}
            onMouseOut={() => setFaceHover(false)}
            src={faceHover ? colorfacebook : facebook}
            width="25"
            height="25"
          />
        </button>
        <div className="mt-6">
          (주) 지금어때는 통신판매 중개자로서 통신판매의 당사자가 아니며 예약
          대기, 이용등과 관련한 의무와 책임은 각 사용자에게 있습니다.
        </div>
        <div className="mt-2">
          (주) 지금어때가 소유/운영/관리하는 웹사이트 및 앱 내의
          상품/판매자/이벤트 정보, 디자인 및 화면의 구성, UI를 포함하여 일체의
          콘텐츠에 대한 무단 복제, 배포, 방송 또는 전송, 스크래핑 등의 행위는
          저작권법 및 콘텐츠산업 진흥법 등 관련 법령에 의하여 엄격히 금지
          됩니다.
        </div>
        <p className="mt-4">Copyright REALTIME COMPANY Corp.</p>
      </div>
    </footer>
  );
};

export default Footer;

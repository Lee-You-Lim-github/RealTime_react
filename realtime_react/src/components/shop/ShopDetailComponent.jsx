import React from "react";

function ShopDetailComponent({ shopinfo }) {
  const {
    intro,
    telephone,
    address,
    opening_hours,
    conv_pack,
    conv_parking,
    conv_pet,
    conv_wifi,
  } = shopinfo;

  const intro_null = (a) => {
    if (a === "NULL" || !intro) {
      return "등록된 매장소개가 없습니다.";
    } else {
      return `${intro}`;
    }
  };

  return (
    <React.Fragment>
      <ul className="list-disc space-y-2">
        <li className="flex items-start">
          <p className="flex flex-shrink-0 items-start text-lg">매장소개</p>
          <span className="h-6 flex items-center sm:h-7">
            <svg
              className="flex-shrink-0 h-5 w-5 text-cyan-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            ></svg>
          </span>
          <div className="ml-4 text-left text-lg">
            <p>{intro_null(intro)}</p>
          </div>
        </li>

        <li className="flex items-start">
          <p className="flex items-start text-lg">전화번호</p>
          <span className="h-6 flex items-center sm:h-7">
            <svg
              className="flex-shrink-0 h-5 w-5 text-cyan-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            ></svg>
          </span>
          <div className="ml-4 text-lg">
            <p>{telephone}</p>
          </div>
        </li>
        <li className="flex items-start">
          <p className="flex items-start text-lg">매장주소</p>
          <span className="h-6 flex items-center sm:h-7">
            <svg
              className="flex-shrink-0 h-5 w-5 text-cyan-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            ></svg>
          </span>
          <div className="ml-4 text-lg">
            <p>{address}</p>
          </div>
        </li>
        <li className="flex items-start">
          <p className="flex items-start text-lg">영업시간</p>
          <span className="h-6 flex items-center sm:h-7">
            <svg
              className="flex-shrink-0 h-5 w-5 text-cyan-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            ></svg>
          </span>
          <div className="ml-4 text-lg">
            <p>{opening_hours}</p>
          </div>
        </li>
        <li className="flex items-start">
          <p className="flex items-start text-lg">편의시설</p>
          <span className="h-6 flex items-center sm:h-7">
            <svg
              className="flex-shrink-0 h-5 w-5 text-cyan-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            ></svg>
          </span>
          <div className="ml-4 text-lg">
            <span className="mx-1">주차장{conv_parking ? "👌" : "❌"}</span>
            <span className="mx-1">반려동물동반{conv_pet ? "👌" : "❌"}</span>
            <span className="mx-1">와이파이{conv_wifi ? "👌" : "❌"}</span>
            <span className="mx-1">포장{conv_pack ? "👌" : "❌"}</span>
          </div>
        </li>
      </ul>
    </React.Fragment>
  );
}

export default ShopDetailComponent;

import React, { useState } from "react";
import "./modal.css";

const Modal = (props) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, header } = props;
  const [value, setValue] = useState(0);

  const handleClickPlus = () => {
    setValue(value + 1);
  };

  const handleClickMinus = () => {
    setValue(value - 1);
  };

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section>
          <header>
            {header}
            <button className="close" onClick={close}>
              {" "}
              &times;{" "}
            </button>
          </header>
          <main>{props.children}</main>
          <div className="flex justify-center mr-3 my-1">
            <span className="mr-5">예약 테이블 수 : {value}</span>
            <button
              type="button"
              name="plus"
              onClick={handleClickPlus}
              className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
            >
              +
            </button>

            <button
              type="button"
              name="minus"
              onClick={handleClickMinus}
              className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
            >
              -
            </button>
            <footer>
              <button className="ml-5 text-sm bg-gray-500 hover:bg-gray-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">
                예약하기
              </button>
            </footer>
          </div>
        </section>
      ) : null}
    </div>
  );
};

export default Modal;

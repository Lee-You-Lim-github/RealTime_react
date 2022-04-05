import React from "react";
import "./modal.css";

function DontWaitingModal(props) {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, header } = props;

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
            <div className="py-1"></div>
            <footer></footer>
          </div>
        </section>
      ) : null}
    </div>
  );
}

export default DontWaitingModal;

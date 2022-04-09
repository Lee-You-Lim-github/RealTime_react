import React from "react";

function WaitingCancelModal(props) {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, header, handleCancle } = props;

  const handleYes = (e) => {
    handleCancle(e);
    close();
  };

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section>
          <header>
            <div className="text-lg text-gray-700">{header}</div>
            <button className="close" onClick={close}>
              {" "}
              &times;{" "}
            </button>
          </header>
          <main>{props.children}</main>
          <div className="flex justify-center mr-5 my-1">
            <button
              type="button"
              name="yes"
              onClick={handleYes}
              className="mr-3 text-sm bg-orange-400 hover:bg-orange-300 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
            >
              예
            </button>

            <button
              type="button"
              name="no"
              onClick={close}
              className="text-sm border-2 border-orange-400 hover:border-orange-300 hover:text-orange-300 text-orange-400 py-1 px-2 rounded focus:outline-none focus:shadow-outline"
            >
              아니오
            </button>
          </div>
        </section>
      ) : null}
    </div>
  );
}

export default WaitingCancelModal;

import React from "react";

function WaitingVisitConfirm(props) {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, header, clickedVisit } = props;

  const handleYes = () => {
    clickedVisit();
    close();
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
          <div className="flex justify-center mr-3 my-1">
            <button
              type="button"
              onClick={handleYes}
              name="yes"
              className="mr-3 text-sm bg-orange-400 hover:bg-orange-300 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
            >
              예
            </button>

            <button
              type="button"
              onClick={close}
              name="no"
              className="text-sm border-2 border-orange-400 hover:border-orange-300 hover:text-orange-300 text-orange-400 py-1 px-2 rounded focus:outline-none focus:shadow-outline"
            >
              취소
            </button>
          </div>
        </section>
      ) : null}
    </div>
  );
}

export default WaitingVisitConfirm;

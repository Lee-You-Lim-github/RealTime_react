import React from "react";

function NotVisitConfirmModal(props) {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, header, clickedUnvisited } = props;

  const handleYes = (e) => {
    clickedUnvisited(e);
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
              className="mr-3 text-sm bg-violet-400 hover:bg-red-300 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
            >
              확인
            </button>

            <button
              type="button"
              onClick={close}
              name="no"
              className="text-sm border-2 border-violet-300 hover:border-red-300 hover:text-red-300 text-violet-400 py-1 px-2 rounded focus:outline-none focus:shadow-outline"
            >
              취소
            </button>
          </div>
        </section>
      ) : null}
    </div>
  );
}

export default NotVisitConfirmModal;

import React from "react";
import noshow_warning from "assets/img/noshow_warning.png";

function DeleteConfirmModal(props) {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, header, name, handleDelete, miniheader } = props;

  const handleYes = (e) => {
    if (name === "review_delete") {
      handleDelete(e);
      close();
    } else if (name === "user_booking_delete") {
      handleDelete(e);
      close();
    } else if (name === "admin_shop_bookings") {
      handleDelete(e);
      close();
    }
  };

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section>
          <header>
            <div className="text-lg text-gray-700">{header}</div>
            {miniheader && (
              <div className="flex flex-row justify-center text-xs text-red-600 mt-1">
                <img src={noshow_warning} alt="" className="w-8 h-8 mr-1" />
                <div className="mt-1">{miniheader}</div>
              </div>
            )}
            <button className="close" onClick={close}>
              {" "}
              &times;{" "}
            </button>
          </header>
          <div className="flex justify-center mr-5 my-1">
            <button
              type="button"
              name="yes"
              onClick={handleYes}
              className="mr-3 text-sm bg-violet-400 hover:bg-red-300 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
            >
              예
            </button>

            <button
              type="button"
              name="no"
              onClick={close}
              className="text-sm border-2 border-violet-400 hover:border-red-300 hover:text-red-300 text-violet-400 py-1 px-2 rounded focus:outline-none focus:shadow-outline"
            >
              아니오
            </button>
          </div>
        </section>
      ) : null}
    </div>
  );
}

export default DeleteConfirmModal;

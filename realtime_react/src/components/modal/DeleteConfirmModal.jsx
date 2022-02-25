import React from "react";

function DeleteConfirmModal(props) {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, header, name, handleDelete } = props;

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
            {header}
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
              {header === "정말 삭제하시겠습니까?" ||
              "해당 매장 정보를 삭제하시겠습니까?"
                ? "삭제"
                : "그래도 취소"}
            </button>

            <button
              type="button"
              name="no"
              onClick={close}
              className="text-sm border-2 border-violet-400 hover:border-red-300 hover:text-red-300 text-violet-400 py-1 px-2 rounded focus:outline-none focus:shadow-outline"
            >
              {header === "정말 삭제하시겠습니까?" ||
              "해당 매장 정보를 삭제하시겠습니까?"
                ? "취소"
                : "예약유지"}
            </button>
          </div>
        </section>
      ) : null}
    </div>
  );
}

export default DeleteConfirmModal;

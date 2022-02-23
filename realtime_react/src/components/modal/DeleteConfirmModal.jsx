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
    }
    //   } else if (header === "가입하시겠습니까?") {
    //     handleSubmit();
    //     close();
    //   }
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
              name="yes"
              onClick={handleYes}
              className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
            >
              {header === "정말 삭제하시겠습니까?" ? "삭제" : "그래도 취소"}
            </button>

            <button
              type="button"
              name="no"
              onClick={close}
              className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
            >
              취소
            </button>
          </div>
        </section>
      ) : null}
    </div>
  );
}

export default DeleteConfirmModal;

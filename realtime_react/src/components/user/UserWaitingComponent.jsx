import { useApiAxios } from "api/base";
import LoadingIndicator from "components/LoadingIndicator";
import { useAuth } from "contexts/AuthContext";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import noshow_warning from "assets/img/noshow_warning.png";
import WaitingCancelModal from "components/modal/WaitingCancelModal";

function UserWaitingComponent({ wait_obj }) {
  const [auth] = useAuth();

  // confirm 모달창
  const [modalOpen, setModalOpen] = useState(false);

  //  취소여부 변경: "0" = 취소X, "1" = 취소O
  const [{ loading: waitLoading, error: waitError }, waitRequest] = useApiAxios(
    {
      url: `/waiting/api/waitings/?all&user_id=${auth.id}`,
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${auth.access}`,
      },
    },
    { manual: true }
  );

  const handleCancle = (e) => {
    e.preventDefault();
    waitRequest({
      url: `/waiting/api/waitings/${wait_obj.id}/`,
      data: { wait_cancel: "1" },
    }).then((response) => {
      alert("취소되었습니다.");
      window.location.replace(`/user/${auth.id}/waitings/`);
    });
  };

  // confirm 모달 열기
  const openModal = () => {
    setModalOpen(true);
  };

  // confirm 모달 닫기
  const closeModal = () => {
    setModalOpen(false);
  };

  // 화면을 눌렀을 때 닫기 가능
  const el = useRef();

  const handleClose = (e) => {
    if (modalOpen && (!el.current || !el.current.contains(e.target)))
      setModalOpen(false);
  };

  useEffect(() => {
    window.addEventListener("click", handleClose);
    return () => {
      window.removeEventListener("click", handleClose);
    };
  }, []);

  // 0: 대기중 1: 입장 2: 대기취소
  const visit_state = (visit) => {
    if (visit === "1") {
      return <div className="flex justify-end">입장 ✅</div>;
    } else {
      return <div className="flex justify-end">대기중 🚀</div>;
    }
  };

  return (
    <div className="mb-3">
      {waitLoading && <LoadingIndicator>취소 중...</LoadingIndicator>}
      {waitError?.response?.status >= 400 && (
        <div className="text-red-400">취소에 실패했습니다.</div>
      )}
      <Link to={`/shop/${wait_obj.shop_id.id}/`} className="text-2xl">
        <p className="text-left">{wait_obj.shop_id.name}</p>
      </Link>
      <div className="grid grid-cols-4">
        <div className="bg-violet-300 border border-violet-400 text-left rounded-sm p-3">
          <p>나의 대기 번호</p>
          <p>대기 등록 시간</p>
          <p>대기 테이블 수</p>
        </div>
        <div className="col-span-3 border border-violet-400 rounded-sm p-3">
          <div className="grid grid-cols-3">
            <div className="col-span-1">
              <p className="text-left">{wait_obj.wait_count}</p>
              <p className="text-left">
                {wait_obj.wait_date.slice(0, -16)}{" "}
                {wait_obj.wait_date.slice(11, -7)}
              </p>
              <p className="text-left">{wait_obj.wait_table_count}</p>
            </div>
            <div className="col-start-3">
              <div className="grid grid-rows-2">
                <div>대기인원</div>
                <div>
                  <React.Fragment>
                    <div className="text-right">
                      {wait_obj.wait_cancel === "0" ? (
                        <div>{visit_state(wait_obj.wait_visit_status)}</div>
                      ) : (
                        <div className="">대기취소 😥</div>
                      )}
                    </div>

                    {wait_obj.wait_visit_status !== "1" &&
                    wait_obj.wait_cancel === "0" ? (
                      <div className="text-right">
                        <button
                          disabled={waitLoading}
                          onClick={openModal}
                          onChange={wait_obj.id}
                          className=" bg-violet-300 hover:bg-red-200 text-white text-sm text-right rounded p-1"
                        >
                          대기취소
                        </button>
                      </div>
                    ) : (
                      <div> </div>
                    )}

                    <WaitingCancelModal
                      handleCancle={handleCancle}
                      open={modalOpen}
                      close={closeModal}
                      header="대기를 취소 하시겠습니까?"
                      ref={el}
                    >
                      <div>
                        <div className="flex flex-col justify-center text-xs text-red-600 -mt-3">
                          <div className="flex justify-center">
                            <img
                              src={noshow_warning}
                              alt=""
                              className="w-8 h-8"
                            />
                          </div>
                          <div className="mt-1 text-base">
                            <p>
                              취소 후 대기 등록시 새로운 대기번호가 부여됩니다.
                            </p>
                            <p>정말 취소하시겠습니까?</p>
                          </div>
                        </div>
                      </div>
                    </WaitingCancelModal>
                  </React.Fragment>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserWaitingComponent;

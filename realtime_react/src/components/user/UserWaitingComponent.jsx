import { useApiAxios } from "api/base";
import LoadingIndicator from "components/LoadingIndicator";
import { useAuth } from "contexts/AuthContext";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import noimages from "assets/img/noimages.png";
import noshow_warning from "assets/img/noshow_warning.png";
import WaitingCancelModal from "components/modal/WaitingCancelModal";

function UserWaitingComponent({ wait_obj }) {
  const [auth] = useAuth();

  // confirm 모달창
  const [modalOpen, setModalOpen] = useState(false);

  // getWaiting
  const [{ data: waits }, waitsrefetch] = useApiAxios(
    {
      url: `/waiting/api/waitings/?all&shop_id=${wait_obj.shop_id.id}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${auth.access}`,
      },
    },
    { manual: true }
  );

  useEffect(() => {
    waitsrefetch();
  }, [wait_obj.shop_id.id]);

  //  취소여부 변경: "0" = 취소X, "1" = 취소O
  const [{ loading: waitLoading, error: waitError }, waitRequest] = useApiAxios(
    {
      url: `/waiting/api/waitings/?all`,
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
      return <div>입장 ✅</div>;
    } else {
      return <div>대기중 🚀</div>;
    }
  };

  const today = new Date();
  const year = today.getFullYear();
  const month = ("0" + (today.getMonth() + 1)).slice(-2);
  const day = ("0" + today.getDate()).slice(-2);

  const dateString = year + "-" + month + "-" + day;

  return (
    <div>
      {waitLoading && <LoadingIndicator>취소 중...</LoadingIndicator>}
      {waitError?.response?.status >= 400 && (
        <div className="text-red-400">취소에 실패했습니다.</div>
      )}

      <div className="w-72 mb-7 border border-stone-300 rounded overflow-hidden hover:-translate-y-1">
        {!wait_obj?.shop_id.photo1 ? (
          <img className="w-full h-56" src={noimages} alt="no_images" />
        ) : (
          <img
            className="w-full h-56"
            src={wait_obj.shop_id.photo1}
            alt={wait_obj.shop_id.name}
          />
        )}

        <div className="my-4 mx-2">
          <Link to={`/shop/${wait_obj.shop_id.id}/`} className="text-2xl">
            <p>{wait_obj.shop_id.name}</p>
          </Link>
          <span className="mt-4 mb-3">
            대기 순서
            <span className="bg-orange-500 text-white rounded-full py-1 px-2 m-1">
              {wait_obj.wait_count -
                waits
                  ?.filter(
                    (shoprWaits) =>
                      shoprWaits.wait_date.slice(0, -16) === dateString &&
                      shoprWaits.wait_count <= wait_obj.wait_count
                  )
                  .filter(
                    (shoprWait) =>
                      shoprWait.wait_cancel === "1" ||
                      shoprWait.wait_visit_status === "1"
                  ).length}
            </span>
          </span>
        </div>

        <div className="grid grid-cols-2">
          <div className="text-left ml-8">
            <p>나의 대기 번호</p>
            <p>대기 등록 일</p>
            <p>대기 등록 시간</p>
            <p>대기 테이블 수</p>
            <p className="mt-4 mb-3">
              {wait_obj.wait_cancel === "0" ? (
                <div>{visit_state(wait_obj.wait_visit_status)}</div>
              ) : (
                <div>대기취소 😥</div>
              )}
            </p>
          </div>

          <div className="ml-6">
            <p className="text-left">{wait_obj.wait_count}</p>
            <p className="text-left">{wait_obj.wait_date.slice(0, -16)}</p>
            <p className="text-left">{wait_obj.wait_date.slice(11, -7)}</p>
            <p className="text-left">{wait_obj.wait_table_count}</p>
            <p className="my-3">
              <React.Fragment>
                {wait_obj.wait_visit_status !== "1" &&
                wait_obj.wait_cancel === "0" ? (
                  <>
                    <button
                      disabled={waitLoading}
                      onClick={() => setModalOpen(true)}
                      onChange={wait_obj.id}
                      className=" border-2 border-orange-400 text-orange-400 text-sm rounded p-1"
                    >
                      대기취소
                    </button>
                  </>
                ) : (
                  <div> </div>
                )}

                {wait_obj.wait_visit_status === "1" &&
                  wait_obj.review_set.length === 0 && (
                    <Link
                      to={`/user/${auth.id}/wait/${wait_obj.id}/review/new/`}
                      className="border-1 border-orange-400 bg-orange-400 text-white text-sm rounded px-[5px] py-[8px]"
                      state={wait_obj.user_id.id}
                    >
                      리뷰작성
                    </Link>
                  )}

                <WaitingCancelModal
                  handleCancle={handleCancle}
                  open={modalOpen}
                  close={() => setModalOpen(false)}
                  header="대기를 취소 하시겠습니까?"
                  ref={el}
                >
                  <div>
                    <div className="flex flex-col justify-center text-xs text-red-600 -mt-3">
                      <div className="flex justify-center">
                        <img src={noshow_warning} alt="" className="w-8 h-8" />
                      </div>
                      <div className="mt-1 text-base">
                        <p>취소 후 대기 등록시 새로운 대기번호가 부여됩니다.</p>
                        <p>정말 취소하시겠습니까?</p>
                      </div>
                    </div>
                  </div>
                </WaitingCancelModal>
              </React.Fragment>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserWaitingComponent;

import { useApiAxios } from "api/base";
import SmsConfirm from "components/modal/SmsConfirm";
import WaitingNotVisitConfirm from "components/modal/WaitingNotVisitConfirm";
import WaitingVisitConfirm from "components/modal/WaitingVisitConfirm";
import { useAuth } from "contexts/AuthContext";
import React, { useState } from "react";

function ShopWaitingList({
  waiting_obj,
  saveWaiting,
  refetch,
  tableCount,
  setTableCount,
}) {
  const [auth] = useAuth();
  // disable
  const [loading, setloading] = useState(false);

  // WaitingVisitConfirm 모달창
  const [modalOpen, setModalOpen] = useState(false);

  // WaitingNotVisitConfirm 모달창
  const [modalOpenNotVisit, setModalOpenNotVisit] = useState(false);

  // ModalOpenSms 모달창
  const [modalOpenSms, setModalOpenSms] = useState(false);

  // 문자 발송
  const [{ loading: smsLoading, error }, saveSms] = useApiAxios(
    {
      url: "/accounts/api/naver_sms_api/",
      method: "POST",
      headers: {
        Authorization: `Bearer ${auth.access}`,
      },
    },
    { manual: true }
  );

  const naver_sms = () => {
    saveSms({
      data: {
        content: `${waiting_obj.user_id.username} 고객님 입장해주세요!`,
        messages: [
          {
            to: "01038336177",
          },
        ],
      },
    })
      .then(() => alert("요청되었습니다."))
      .catch((error) => console.log("에러:", error));
  };

  // 회원이 입장한 경우
  const clickedVisit = () => {
    console.log("클릭 전 테이블 수: ", tableCount);
    setTableCount((prev) => prev - waiting_obj.wait_table_count);
    console.log("클릭한 후 테이블 수: ", tableCount);

    saveWaiting({
      url: `/waiting/api/waitings/${waiting_obj.id}/`,
      data: { wait_visit_status: "1" },
    })
      .then(() => {
        alert("입장이 확인되었습니다.");
        setloading(true);
        refetch();
      })
      .catch((error) => console.log(error));
  };

  // 회원이 미입장한 경우
  const clickedNotVisit = () => {
    console.log("클릭 전 테이블 수: ", tableCount);
    setTableCount((prev) => prev - waiting_obj.wait_table_count);
    console.log("클릭한 후 테이블 수: ", tableCount);

    saveWaiting({
      url: `/waiting/api/waitings/${waiting_obj.id}/`,
      data: { wait_visit_status: "2" },
    }).then(() => {
      alert("미입장이 확인되었습니다.");
      setloading(true);
      refetch();
    });
  };

  return (
    <div>
      <span className="mx-10">{waiting_obj.wait_count}</span>
      <span className="mx-10">{waiting_obj.user_id.username}</span>
      <span className="mx-10">{waiting_obj.user_id.telephone}</span>
      <span className="mx-10">{waiting_obj.wait_table_count}</span>
      <span className="mx-10">{waiting_obj.wait_date.slice(11, 16)}</span>
      <span className="mx-10">
        <React.Fragment>
          <button onClick={() => setModalOpenSms(true)}>요청</button>
          <SmsConfirm
            naver_sms={naver_sms}
            open={modalOpenSms}
            close={() => setModalOpenSms(false)}
            header="입장 요청하시겠습니까?"
          />
        </React.Fragment>
      </span>
      <span className="mx-3">
        <React.Fragment>
          <button disabled={loading} onClick={() => setModalOpen(true)}>
            입장
          </button>
          <WaitingVisitConfirm
            clickedVisit={clickedVisit}
            open={modalOpen}
            close={() => setModalOpen(false)}
            header="입장하셨습니까?"
          />
        </React.Fragment>
      </span>
      <span>
        <React.Fragment>
          <button disabled={loading} onClick={() => setModalOpenNotVisit(true)}>
            미입장
          </button>
          <WaitingNotVisitConfirm
            clickedNotVisit={clickedNotVisit}
            open={modalOpenNotVisit}
            close={() => setModalOpenNotVisit(false)}
            header="미입장하셨습니까?"
          />
        </React.Fragment>
      </span>
    </div>
  );
}

export default ShopWaitingList;

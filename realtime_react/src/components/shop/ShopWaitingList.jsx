import { useApiAxios } from "api/base";
import DebugStates from "components/DebugStates";
import SmsConfirm from "components/modal/SmsConfirm";
import WaitingNotVisitConfirm from "components/modal/WaitingNotVisitConfirm";
import WaitingVisitConfirm from "components/modal/WaitingVisitConfirm";
import { useAuth } from "contexts/AuthContext";
import React, { useState } from "react";

function ShopWaitingList({ waiting_obj, saveWaiting, refetch, setTableCount }) {
  const [auth] = useAuth();

  // disable
  const [loading, setLoading] = useState(false);

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
        content: "",
        messages: [
          {
            to: "01038336177",
            content: `[${waiting_obj.shop_id.name}] ${waiting_obj.user_id.username} 고객님 입장해주세요!`,
          },
        ],
      },
    })
      .then(() => alert("요청되었습니다."))
      .catch((error) => console.log("에러:", error));
  };

  // 회원이 입장한 경우
  const clickedVisit = () => {
    // setTableCount((prev) => prev - waiting_obj.wait_table_count);

    saveWaiting({
      url: `/waiting/api/waitings/${waiting_obj.id}/`,
      data: { wait_visit_status: "1" },
    })
      .then(() => {
        alert("입장이 확인되었습니다.");
        setLoading(true);
        refetch();
      })
      .catch((error) => console.log(error));
  };

  // 회원이 미입장한 경우
  const clickedNotVisit = () => {
    // setTableCount((prev) => prev - waiting_obj.wait_table_count);

    saveWaiting({
      url: `/waiting/api/waitings/${waiting_obj.id}/`,
      data: { wait_visit_status: "2" },
    }).then(() => {
      alert("미입장이 확인되었습니다.");
      setLoading(true);
      refetch();
    });
  };

  return (
    <React.Fragment>
      {/* <DebugStates waiting_obj={waiting_obj} /> */}
      <tr>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-800 whitespace-no-wrap">
            {waiting_obj.wait_count}
          </p>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-800 whitespace-no-wrap">
            {waiting_obj.user_id.username}
          </p>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-800 whitespace-no-wrap">
            {waiting_obj.user_id.telephone}
          </p>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-800 whitespace-no-wrap">
            {waiting_obj.wait_table_count}
          </p>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-800 whitespace-no-wrap">
            {waiting_obj.wait_date.slice(11, 16)}
          </p>
        </td>

        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <React.Fragment>
            <button
              onClick={() => setModalOpenSms(true)}
              className="text-sm bg-orange-400 border-2 border-orange-400 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
            >
              요청
            </button>
            <SmsConfirm
              naver_sms={naver_sms}
              open={modalOpenSms}
              close={() => setModalOpenSms(false)}
              header="입장 요청하시겠습니까?"
            />
          </React.Fragment>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <span>
            <React.Fragment>
              <button
                disabled={loading}
                onClick={() => setModalOpen(true)}
                className="mr-3 text-sm bg-orange-400 border-2 border-orange-400 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
              >
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
              <button
                disabled={loading}
                onClick={() => setModalOpenNotVisit(true)}
                className="text-sm bg-wihte border-2 border-orange-400 text-orange-400 py-1 px-2 rounded focus:outline-none focus:shadow-outline"
              >
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
        </td>
      </tr>
    </React.Fragment>
  );
}

export default ShopWaitingList;

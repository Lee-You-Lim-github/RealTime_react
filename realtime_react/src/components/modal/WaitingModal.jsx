import { useApiAxios } from "api/base";
import { useAuth } from "contexts/AuthContext";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./modal.css";

function WaitingModal(props) {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, header } = props;
  const [value, setValue] = useState(0);
  const [auth] = useAuth();
  const { shopId } = useParams();

  //  저장
  const [, saveWating] = useApiAxios(
    {
      url: `/waiting/api/waitings/`,
      method: "POST",
      headers: {
        Authorization: `Bearer ${auth.access}`,
      },
    },
    { manual: true }
  );

  const handlePlus = () => {
    setValue((value) => value + 1);
  };

  const handleMinus = () => {
    setValue((value) => {
      if (value > 0) {
        return value - 1;
      } else {
        return value;
      }
    });
  };

  const handleClickWait = () => {
    const today = new Date(); // today 객체에 Date()의 결과를 넣어줬다
    const time = {
      year: today.getFullYear(), //현재 년도
      month: today.getMonth() + 1, // 현재 월
      date: today.getDate(), // 현재 날짜
      hours: today.getHours(), //현재 시간
      minutes: today.getMinutes(), //현재 분
      seconds: today.getSeconds(),
    };
    const dateString = `${time.year}-${time.month}-${time.date} + " " + (${time.hours}:${time.minutes}:${time.seconds}`;

    if (value !== 0) {
      saveWating({
        data: {
          wait_date: dateString,
          wait_table_count: value,
          wait_visit_status: "0",
          user_id: auth.id,
          shop_id: parseInt(shopId),
        },
      }).then((response) => {
        if (value >= 1) {
          window.location.replace(`/`);
        }
      });
    } else alert("테이블 수를 확인해주세요");
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

          <main>{props.children}</main>
          <div className="flex justify-center mr-3 my-1">
            <div className="py-1">
              <span className="mr-3">대기 테이블 수 :</span>
              <button
                type="button"
                name="minus"
                onClick={handleMinus}
                className="text-sm h-6 mr-2 bg-orange-400 hover:bg-orange-300 text-white px-2 rounded focus:outline-none focus:shadow-outline"
              >
                -
              </button>
              <span>{value}</span>

              <button
                type="button"
                name="plus"
                onClick={handlePlus}
                className="mr-3 ml-2 h-6 text-sm bg-orange-400 hover:bg-orange-300 text-white px-2 rounded focus:outline-none focus:shadow-outline"
              >
                +
              </button>
            </div>
            <footer>
              <button
                onClick={handleClickWait}
                className="ml-5 text-sm border-2 border-orange-400 hover:border-orange-300 hover:text-orange-300 text-orange-400 py-1 px-2 rounded focus:outline-none focus:shadow-outline"
              >
                줄서기
              </button>
            </footer>
          </div>
        </section>
      ) : null}
    </div>
  );
}

export default WaitingModal;

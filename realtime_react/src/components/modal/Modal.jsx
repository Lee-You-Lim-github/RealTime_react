import { useApiAxios } from "api/base";
import DebugStates from "components/DebugStates";
import { useAuth } from "contexts/AuthContext";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./modal.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Modal(props) {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, header } = props;
  const [value, setValue] = useState(0);
  const [auth] = useAuth();
  const [tableCount, setTableCount] = useState(0);
  const { shopId } = useParams();

  // shop/api/100/ -- object
  const [
    { data: ShopModalData, laoding: myShopLaoding, error: myShopError },
    refetch,
  ] = useApiAxios(
    {
      url: `/shop/api/shops/${shopId}/`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${auth.access}`,
      },
    },
    { manual: true }
  );

  useEffect(() => {
    refetch();
  }, [shopId]);

  // 잔여 테이블 수 변경(수정)
  const [{ loading, error }, saveRuquest] = useApiAxios(
    {
      url: `/shop/api/shops/${shopId}/`,
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${auth.access}`,
      },
    },
    { manual: true }
  );

  useEffect(() => {
    setTableCount(ShopModalData?.now_table_count);
  }, [ShopModalData]);

  // 지금예약 저장
  const [{ loading: NowLoading, error: NowError }, saveNowBooking] =
    useApiAxios(
      {
        url: `/booking/api/newbooking/`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${auth.access}`,
        },
      },
      { manual: true }
    );

  const handlePlus = () => {
    if (
      value <
      ShopModalData.total_table_count - ShopModalData.now_table_count
    ) {
      return setValue(value + 1);
    } else {
      return value;
    }
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

  const handleClickBook = () => {
    setTableCount(ShopModalData.now_table_count + value);
    let today = new Date(); // today 객체에 Date()의 결과를 넣어줬다
    let time = {
      year: today.getFullYear(), //현재 년도
      month: today.getMonth() + 1, // 현재 월
      date: today.getDate(), // 현제 날짜
      hours: today.getHours() + 1, //현재 시간
      minutes: today.getMinutes(), //현재 분
      seconds: today.getSeconds(),
    };
    let timestring_day = `${time.year}-${time.month}-${time.date}`;
    let timestring_time = `${time.hours}:${time.minutes}:${time.seconds}`;
    saveNowBooking({
      data: {
        book_table_count: value,
        visit_status: "0",
        method: "1",
        user_id: auth.id,
        shop_id: parseInt(shopId),
        day: timestring_day,
        time: timestring_time,
      },
    }).then((response) => {
      toast.info("예약되었습니다. 🚀 ", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      if (value >= 1) {
        window.location.replace(`/user/${auth.id}/bookings/`);
      }
    });
  };

  useEffect(() => {
    saveRuquest({
      data: { now_table_count: tableCount },
    })
      .then((response) => {
        console.log(response.data);
        setTableCount(response.data.now_table_count);
      })
      .catch((error) => console.log(error));
  }, [tableCount]);

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
              <span className="mr-3">예약 테이블 수 :</span>
              <button
                type="button"
                name="minus"
                onClick={handleMinus}
                className="text-sm h-6 mr-2 bg-violet-400 hover:bg-red-300 text-white px-2 rounded focus:outline-none focus:shadow-outline"
              >
                -
              </button>
              <span>{value}</span>

              <button
                type="button"
                name="plus"
                onClick={handlePlus}
                className="mr-3 ml-2 h-6 text-sm bg-violet-400 hover:bg-red-300 text-white px-2 rounded focus:outline-none focus:shadow-outline"
              >
                +
              </button>
            </div>
            <footer>
              <button
                onClick={handleClickBook}
                className="ml-5 text-sm border-2 border-violet-400 hover:border-red-300 hover:text-red-300 text-violet-400 py-1 px-2 rounded focus:outline-none focus:shadow-outline"
              >
                예약하기
              </button>
            </footer>
          </div>
        </section>
      ) : null}
    </div>
  );
}

export default Modal;

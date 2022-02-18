import { useApiAxios } from "api/base";
import DebugStates from "components/DebugStates";
import { useAuth } from "contexts/AuthContext";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./modal.css";

function Modal(props) {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, header } = props;
  const [value, setValue] = useState(0);
  const [auth] = useAuth();
  const [tableCount, setTableCount] = useState(0);
  const { shopId } = useParams();

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
    if (value >= 1) {
      window.location.replace(`/shop/${shopId}/`);
    }
  };

  useEffect(() => {
    saveRuquest({
      data: { now_table_count: tableCount },
    })
      .then((response) => {
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
            <span className="mr-5">예약 테이블 수 : {value}</span>
            <button
              type="button"
              name="plus"
              onClick={handlePlus}
              className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
            >
              +
            </button>

            <button
              type="button"
              name="minus"
              onClick={handleMinus}
              className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
            >
              -
            </button>
            <footer>
              <button
                onClick={handleClickBook}
                className="ml-5 text-sm bg-gray-500 hover:bg-gray-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
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

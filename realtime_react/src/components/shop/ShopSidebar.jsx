import { useAuth } from "contexts/AuthContext";
import { Link } from "react-router-dom";
import useredit from "assets/img/useredit.png";
import mystore from "assets/img/mystore.png";
import booknotes from "assets/img/booknotes.png";
import waitnotes from "assets/img/waitnotes.png";
import qna from "assets/img/qna.png";
import { useApiAxios } from "api/base";
import { useEffect, useState } from "react";

function ShopSidebar() {
  const [auth] = useAuth();

  const [userShopId, setUserShopId] = useState("");

  const [{ data, laoding, error }, refetch] = useApiAxios(
    {
      url: `/accounts/api/users/${auth.id}/`,
      method: "GET",
    },
    { manual: true }
  );

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    setUserShopId(data?.shop_set[0]);
  }, [userShopId, data]);

  return (
    <div>
      <div className="flex flex-col">
        <Link
          to={`/user/mypage/${auth.id}/edit/`}
          className="text-white text-xl mb-10"
        >
          <div className="flex">
            <img src={useredit} alt="useredit" className="w-8 h-8 ml-7" />
            <span className="ml-4 mt-1">개인정보수정</span>
          </div>
        </Link>
        <Link
          to={`/shop/myshop/${userShopId}/`}
          className="text-white text-xl mb-10"
        >
          <div className="flex">
            <img src={mystore} alt="mystore" className="w-9 h-9 ml-7" />
            <span className="ml-4 mt-1">마이스토어</span>
          </div>
        </Link>
        <Link
          to={`/shop/${userShopId}/bookings/`}
          className="text-white text-xl mb-10"
        >
          <div className="flex">
            <img src={booknotes} alt="booknotes" className="w-9 h-9 ml-7" />
            <span className="ml-4 mt-1">예약현황</span>
          </div>
        </Link>
        <Link
          to={`/shop/${userShopId}/waitings/`}
          className="text-white text-xl mb-10"
        >
          <div className="flex">
            <img src={waitnotes} alt="waitnotes" className="w-8 h-8 ml-8" />
            <span className="ml-5 mt-1">대기현황</span>
          </div>
        </Link>
        <Link to={`/user/${auth.id}/qna/`} className="text-white text-xl mb-5">
          <div className="flex">
            <img src={qna} alt="qna" className="w-8 h-8 ml-8" />
            <span className="ml-5 mt-1">1:1문의</span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default ShopSidebar;

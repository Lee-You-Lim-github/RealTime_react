import { useAuth } from "contexts/AuthContext";
import { Link } from "react-router-dom";
import useredit from "assets/img/useredit.png";
import booknotes from "assets/img/booknotes.png";
import waitnotes from "assets/img/waitnotes.png";
import qna from "assets/img/qna.png";
import pickstore from "assets/img/pickstore.png";
import review from "assets/img/review.png";

function UserSidebar() {
  const [auth] = useAuth();

  return (
    <div className="flex flex-col w-full h-full bg-orange-400">
      <Link
        to={`/user/mypage/${auth.id}/edit/`}
        className="text-white text-xl mt-12 mb-5"
      >
        <div className="flex">
          <img src={useredit} alt="useredit" className="w-8 h-8 ml-7" />
          <button className="ml-4 hover:bg-white hover:text-orange-400">
            개인정보수정
          </button>
        </div>
      </Link>

      <Link
        to={`/user/${auth.id}/bookings/`}
        className="text-white text-xl my-5"
      >
        <div className="flex">
          <img src={booknotes} alt="booknotes" className="w-9 h-9 ml-7" />
          <button className="ml-4 hover:bg-white hover:text-orange-400">
            예약내역
          </button>
        </div>
      </Link>

      <Link
        to={`/user/${auth.id}/waitings/`}
        className="text-white text-xl my-5"
      >
        <div className="flex">
          <img src={waitnotes} alt="waitnotes" className="w-8 h-8 ml-8" />
          <button className="ml-5 hover:bg-white hover:text-orange-400">
            대기내역
          </button>
        </div>
      </Link>
      <Link to={`/user/${auth.id}/pick/`} className="text-white text-xl my-5">
        <div className="flex">
          <img src={pickstore} alt="pickstore" className="w-8 h-8 ml-8" />
          <button className="ml-5 hover:bg-white hover:text-orange-400">
            위시리스트
          </button>
        </div>
      </Link>
      <Link to={`/user/${auth.id}/review/`} className="text-white text-xl my-5">
        <div className="flex">
          <img src={review} alt="review" className="w-9 h-9 ml-8" />
          <button className="ml-5 hover:bg-white hover:text-orange-400">
            리뷰내역
          </button>
        </div>
      </Link>
      <Link to={`/user/${auth.id}/qna/`} className="text-white text-xl my-5">
        <div className="flex">
          <img src={qna} alt="qna" className="w-8 h-8 ml-8" />
          <button className="ml-5 hover:bg-white hover:text-orange-400">
            1:1문의
          </button>
        </div>
      </Link>
    </div>
  );
}

export default UserSidebar;

import { Link } from "react-router-dom";

function UserInfoComponent({ userData, auth }) {
  return (
    <div className="flex my-7 p-2">
      <h3 className="bg-violet-300 w-1/4 text-left rounded-sm p-3 leading-loose">
        회원정보
      </h3>
      <div className="border border-violet-300 w-3/4 rounded-sm p-3">
        <p className="text-left">ID : {userData.user_id}</p>
        <p className="text-left">이름 : {userData.username}</p>
        <p className="text-left">닉네임 : {userData.nickname}</p>
        <p className="text-left flex">휴대전화번호 : {userData.telephone}</p>
        <p className="text-right">
          <Link
            to={`/user/mypage/${auth.id}/edit/`}
            className="bg-violet-300 hover:bg-red-200 text-sm text-right rounded p-2"
          >
            수정
          </Link>
        </p>
      </div>
    </div>
  );
}

export default UserInfoComponent;

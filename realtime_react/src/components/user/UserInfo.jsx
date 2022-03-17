import { useApiAxios } from "api/base";
import { useAuth } from "contexts/AuthContext";
import React, { useEffect } from "react";
import "./UserInfo.css";

function UserInfo() {
  const [auth] = useAuth();

  // const [reviewList, setReviewList] = useState([]);

  // const [reviewId, setReviewId] = useState(0);

  // // confirm 모달창
  // const [modalOpen, setModalOpen] = useState(false);

  const [{ data: userData }, refetch] = useApiAxios(
    {
      url: `/accounts/api/users/${auth.id}/`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${auth.access}`,
      },
    },
    { manual: true }
  );

  useEffect(() => {
    refetch();
  }, []);

  // const [{ loading: deleteLoading, error: deleteError }, deleteBooking] =
  //   useApiAxios(
  //     {
  //       url: `/shop/api/reviews/${reviewData?.id}/`,
  //       method: "DELETE",
  //       headers: {
  //         Authorization: `Bearer ${auth.access}`,
  //       },
  //     },
  //     { manual: true }
  //   );

  // const handleDelete = (e) => {
  //   deleteBooking({
  //     url: `/shop/api/reviews/${reviewId}/`,
  //     method: "DELETE",
  //   });
  //   alert("삭제되었습니다.");

  //   window.location.replace(`/user/mypage/${userId}/`);
  // };

  // useEffect(() => {
  //   reviewRefetch();
  // }, []);

  return (
    <div className="ml-3">
      <p className="text-left">ID : {auth.user_id}</p>
      <p className="text-left">이름 : {auth.username}</p>
      <p className="text-left">닉네임 : {auth.nickname}</p>
      <p className="text-left">휴대전화번호 : {auth.telephone}</p>
      <p className="text-left">노쇼횟수 : </p>
    </div>
  );
}

export default UserInfo;

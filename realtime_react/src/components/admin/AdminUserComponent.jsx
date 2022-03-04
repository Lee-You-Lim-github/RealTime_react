import penalty_check from "assets/img/penalty_check.png";
import React, { useEffect, useState } from "react";

function AdminUserComponent(props) {
  const { user } = props;

  const [userId, setUserId] = useState();

  console.log(user.id);
  console.log(user);
  console.log(user.booking_set);

  useEffect(() => {
    setUserId(user.user_id);
  }, []);

  // 구분(개인/사업자)
  const admin_users_authority = (authority) => {
    if (authority === "0") {
      return "개인";
    } else {
      return "사업자";
    }
  };

  const penalty = (visit, index) => {
    if (index === 0) {
      if (visit === "2") {
        return <img className="w-6 h-6" src={penalty_check} alt="" />;
      } else {
        return null;
      }
    } else if (index === 1) {
      if (visit === "2") {
        return <img className="w-6 h-6" src={penalty_check} alt="" />;
      } else {
        return null;
      }
    }
  };

  return (
    <React.Fragment>
      <tr>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 whitespace-no-wrap">{user.user_id}</p>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 whitespace-no-wrap">{user.username}</p>
        </td>
        <td className=" px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 whitespace-no-wrap">{user.nickname}</p>
        </td>
        <td className="px-5  py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 whitespace-no-wrap">{user.telephone}</p>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 whitespace-no-wrap">
            {admin_users_authority(user.authority)}
          </p>
        </td>
        <td className="px-5 border-b border-gray-200 bg-white text-sm">
          <p className="ml-10 whitespace-no-wrap">
            {user.booking_set
              ?.filter(
                (booking_filter) => userId === booking_filter.user_id.user_id
              )
              .map((booking, index) => penalty(booking.visit_status, index))}
          </p>
        </td>
      </tr>
    </React.Fragment>
  );
}

export default AdminUserComponent;

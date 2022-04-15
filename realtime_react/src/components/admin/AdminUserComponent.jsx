import { useApiAxios } from "api/base";
import black_check from "assets/img/penalty_check.png";
import axios from "axios";
import { useAuth } from "contexts/AuthContext";
import React, { useEffect, useState } from "react";

function AdminUserComponent(props) {
  const { user } = props;

  const [auth] = useAuth();

  const [userId, setUserId] = useState();

  const [reload, setReload] = useState(false);

  useEffect(() => {
    setUserId(user.user_id);
    setReload((prevState) => !prevState);
  }, []);

  // 구분(개인/사업자)
  const admin_users_authority = (authority) => {
    if (authority === "0") {
      return "개인";
    } else {
      return "사업자";
    }
  };

  // 블랙

  const [{ loading: deleteLoading, error: deleteError }, deleteBlack] =
    useApiAxios(
      {
        url: `/user/api/blacks/${user?.black_set[0]?.id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${auth.access}`,
        },
      },
      { manual: true }
    );

  const [{ loading: deletedLoading, error: deletedError }, deleteBlacklog] =
    useApiAxios(
      {
        url: `/user/api/blacklogs/${user?.blacklog_set[0]?.id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${auth.access}`,
        },
      },
      { manual: true }
    );

  const handleblackDelete = (e) => {
    deleteBlack({
      url: `/user/api/blacks/${user?.black_set[0]?.id}`,
      method: "DELETE",
    })
      .then(() => {})
      .catch((error) => {});
  };

  const handleblacklogDelete = (e) => {
    deleteBlacklog({
      url: `/user/api/blackLogs/${user?.blacklog_set[0]?.id}`,
      method: "DELETE",
    })
      .then(() => {
        setReload((prevState) => !prevState);
      })
      .catch((error) => {});
  };

  const [{ errorMessages }, saveAdminblack] = useApiAxios(
    {
      url: `/accounts/api/users/${user.id}/`,
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${auth.access}`,
      },
    },
    { manual: true }
  );

  const handleSubmitactive = () => {
    saveAdminblack({
      data: { is_active: 1 },
    })
      .then(() => {
        alert("블랙이 해제되었습니다.");
        window.location.replace(`/admin/user/`);
      })
      .catch((error) => {});
  };

  const handleblack = () => {
    axios.all([
      handleblackDelete(),
      handleSubmitactive(),
      handleblacklogDelete(),
    ]);
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
          <p className="whitespace-no-wrap">
            {user.black_set
              ?.filter(
                (black_filter) => userId === black_filter.user_id.user_id
              )
              .map((black, index) => (
                <button onClick={handleblack}>
                  <img
                    className="w-6 h-6"
                    src={black_check}
                    alt="black_check"
                    key={index}
                  />
                </button>
              ))}
          </p>
        </td>
      </tr>
    </React.Fragment>
  );
}

export default AdminUserComponent;

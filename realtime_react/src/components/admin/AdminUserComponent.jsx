import React from "react";

function AdminUserComponent({ user }) {
  return (
    <React.Fragment>
      <tr>
        <td class="pl-6 py-5 border-b border-gray-200 bg-white text-sm">
          <div class="flex items-center">
            <p class="text-gray-900 whitespace-no-wrap">{user.user_id}</p>
          </div>
        </td>
        <td class="py-5 border-b border-gray-200 bg-white text-sm">
          <p class="text-gray-900 whitespace-no-wrap">{user.username}</p>
        </td>
        <td class="py-5 border-b border-gray-200 bg-white text-sm">
          <p class="text-gray-900 whitespace-no-wrap">{user.nickname}</p>
        </td>
        <td class="py-5 border-b border-gray-200 bg-white text-sm">
          <p class="text-gray-900 whitespace-no-wrap">{user.telephone}</p>
        </td>
      </tr>
    </React.Fragment>
  );
}

export default AdminUserComponent;

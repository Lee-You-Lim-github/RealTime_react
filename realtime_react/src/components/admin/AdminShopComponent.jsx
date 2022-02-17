import DebugStates from "components/DebugStates";
import React from "react";

function AdminShopComponent({ admin_shop, handleDelete }) {
  return (
    <React.Fragment>
      {/* <DebugStates admin_shop={admin_shop} /> */}
      <tr>
        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <div class="flex items-center">
            <div class="ml-3">
              <p class="text-gray-900 whitespace-no-wrap">
                {admin_shop.shop_num}
              </p>
            </div>
          </div>
        </td>
        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p class="text-gray-900 whitespace-no-wrap">{admin_shop.name}</p>
        </td>
        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p class="text-gray-900 whitespace-no-wrap">{admin_shop.telephone}</p>
        </td>
        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p class="text-gray-900 whitespace-no-wrap">{admin_shop.address}</p>
        </td>
        <td class="p-3 px-5 flex justify-end">
          <button
            type="button"
            onClick={(e) => handleDelete(admin_shop.id)}
            disabled={false}
            class="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
          >
            삭제
          </button>
        </td>
      </tr>
    </React.Fragment>
  );
}

export default AdminShopComponent;

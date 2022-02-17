import React from "react";

function AdminBookingComponent({ booking }) {
  return (
    <React.Fragment>
      <tr>
        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <div class="flex items-center">
            <div class="ml-3">
              <p class="text-gray-900 whitespace-no-wrap">{booking.id}</p>
            </div>
          </div>
        </td>
        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p class="text-gray-900 whitespace-no-wrap">
            {booking.shop_id.shop_num}
          </p>
        </td>
        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p class="text-gray-900 whitespace-no-wrap">{booking.shop_id.name}</p>
        </td>
        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p class="text-gray-900 whitespace-no-wrap">
            {booking.user_id.user_id}
          </p>
        </td>
        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p class="text-gray-900 whitespace-no-wrap">
            {booking.user_id.username}
          </p>
        </td>
        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p class="text-gray-900 whitespace-no-wrap">{booking.day}</p>
        </td>

        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p class="text-gray-900 whitespace-no-wrap">
            {booking.time.slice(0, 5)}
          </p>
        </td>
        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p class="text-gray-900 whitespace-no-wrap">
            {booking.book_table_count}
          </p>
        </td>
        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p class="text-gray-900 whitespace-no-wrap">
            {booking.visit_status === 1 ? (
              <p>방문</p>
            ) : booking.visit_status === 2 ? (
              <p>미방문</p>
            ) : (
              <p>방문예정</p>
            )}
          </p>
        </td>
      </tr>
    </React.Fragment>
  );
}

export default AdminBookingComponent;
